using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using HAICOP.Data;
using HAICOP.Models;



namespace HAICOP.Controllers
{
    public class DocController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IHostingEnvironment _environment;
        private ILogger _logger;

        public DocController(ApplicationDbContext context,IHostingEnvironment environment , ILoggerFactory loggerFactory)
        {
            _context = context;
            _environment = environment;
            _logger = loggerFactory.CreateLogger<DocController>();
    
        }

        public async Task<IActionResult> Index()
        {
            var applicationDbContext =  _context.Dossier.Include(d => d.Commission)
                                                        .Include( d => d.Mails)
                                                        .Where( d => d.State != DossierState.Accept && d.State != DossierState.Refus );
            return View(await applicationDbContext.ToListAsync());
        }

        public IActionResult Rep()
        {
            var doc =   _context.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .Where(d => d.State == DossierState.Traitement);

            List<DocDetail> re = new List<DocDetail>();
            foreach( var item in doc)
            {
                var four = _context.FourInDossier.Include( f => f.Fournisseur)
                                                 .Where( f => f.DossierID == item.ID)
                                                 .Select(f => f.Fournisseur)
                                                 .ToList();

                var achteur = _context.AchInDossier.Include( a => a.Acheteur)
                                                    .SingleOrDefault( a => a.DossierID == item.ID).Acheteur ;
                
                var rapporteur = _context.Rapporteur.Include( r => r.Agent)
                                                    .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                
                var dessision = _context.DessisionInMetting.Include( d => d.Dessision)
                                                            .Include( d => d.Metting)
                                                            .SingleOrDefault( d => d.Metting.DossierID == item.ID).Dessision;

                re.Add(new DocDetail { Dossier = item , Fournisseurs = four, Acheteur = achteur , Rapporteur = rapporteur , Dessision = dessision });
            }
                                        
            return View(re);
        }

        public IActionResult New()
        {
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl" );
            ViewData["AcheteurID"] = new SelectList(_context.Acheteur, "ID", "Lbl" );

            ViewData["Num"] = GenerateNewNum();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> New([Bind("ID,CommissionID,Subject,Num,Type,Nature,DocDate,EnterDate,ProDate,AcheteurID,FournisseurID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc,Location")] NewDossier dossier)
        {
            if (ModelState.IsValid)
            {

                string file = Upload(dossier.Location).Result;

                if(file != "")
                {
                    Dossier doc = new Dossier{ CommissionID = dossier.CommissionID , Subject = dossier.Subject ,
                                        Num = GenerateNewNum() , Type = dossier.Type , Nature = dossier.Nature,
                                        DocDate = dossier.DocDate , EnterDate = dossier.EnterDate , ProDate = dossier.ProDate  };
                    _context.Add(doc);
                    Mail mail = new Mail { Dossier = doc , Ref = dossier.Ref , OriginRef = dossier.OriginRef , From = dossier.From , 
                                            MailType = dossier.MailType , MailNature = dossier.MailNature , MailDate = dossier.MailDate ,
                                            Desc = dossier.Desc , Url = file};
                    
                    await _context.SaveChangesAsync();
                    AchInDossier ach = new AchInDossier { Dossier = doc , AcheteurID = dossier.AcheteurID};
                    _context.Add(ach);
                    _context.Add(mail);
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }

            ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
            
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", dossier.CommissionID);
            ViewData["AcheteurID"] = new SelectList(_context.Acheteur, "ID", "Lbl" , dossier.AcheteurID);
            ViewData["Num"] = GenerateNewNum();
            return View(dossier);
        }

        public IActionResult Rapp()
        {
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl" );
            ViewData["AcheteurID"] = new SelectList(_context.Acheteur, "ID", "Lbl" );
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<bool> Rapp([Bind("ID,CommissionID,AcheteurID,AgentID")] Rapp model)
        {
            try
            {
                Rapporteur rapporteur = new Rapporteur {AgentID = model.AgentID , DossierID = model.ID};
                _context.Add(rapporteur);
                var dossier = await _context.Dossier.SingleOrDefaultAsync(m => m.ID == model.ID);
                dossier.State = DossierState.Encour ;
                _context.Update(dossier);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public async Task<IActionResult> EditRapp()
        {
            return View(await _context.Rapporteur.Include(d => d.Dossier).Include(a => a.Agent).Include(c => c.Dossier.Commission).ToListAsync() );

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<bool> EditRapp(int DossierID , int AgentID , int OldAgentID)
        {
             _logger.LogInformation(3, string.Format( " dossier id {0} oldagent id {1} agentid {2}", DossierID,OldAgentID,AgentID ) );
                try
                {
                    var rapp = await _context.Rapporteur.SingleAsync(m => m.DossierID == DossierID && m.AgentID == OldAgentID);
                    _context.Remove(rapp);
                    _context.Add(new Rapporteur { AgentID = AgentID , DossierID = DossierID});
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception ex)
                { 
                    _logger.LogInformation(3, ex.Message);
                }

            return false;
            
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dossier =    await _context.AchInDossier.Include( d => d.Dossier)
                                                        .Include( d => d.Acheteur)
                                                        .Include( c => c.Dossier.Commission)
                                                        .SingleOrDefaultAsync(m => m.DossierID == id);
            if (dossier == null)
            {
                return NotFound();
            }

            ViewData["AcheteurID"] = new SelectList(_context.Acheteur, "ID", "Lbl" , dossier.AcheteurID);
            ViewData["OldAcheteurID"] = dossier.AcheteurID;
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", dossier.Dossier.CommissionID);
            NewDossier doc = new NewDossier();
            doc.InitFromAchaInDossier(dossier);
            return View(doc);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id,int AcheteurID,int OldAcheteurID, [Bind("ID,CommissionID,Subject,Num,Type,Nature,DocDate,EnterDate,ProDate")] Dossier dossier )
        {
            if (id != dossier.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dossier);

                    if(AcheteurID != OldAcheteurID)
                    {
                        var ach = await _context.AchInDossier.SingleAsync(m => m.DossierID == dossier.ID && m.AcheteurID == OldAcheteurID);
                        _context.Remove(ach);
                        _context.Add(new AchInDossier { AcheteurID = AcheteurID  , DossierID = dossier.ID});
                    }

                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DossierExists(dossier.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            
            ViewData["AcheteurID"] = new SelectList(_context.Acheteur, "ID", "Lbl" , AcheteurID);
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", dossier.CommissionID);
            NewDossier doc = new NewDossier();
            doc.InitFromDossier(dossier,AcheteurID);
            return View(doc);
        }

        public async Task<IActionResult> Mail(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mails =  _context.Mail.Include( d => d.Dossier)
                                            .Include( c => c.Dossier.Commission)
                                            .Where(m => m.DossierID == id);
            if (mails == null)
            {
                return NotFound();
            }

            
            return View(await mails.ToListAsync());
        }


        public IActionResult EditMail(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mail = _context.Mail.SingleOrDefault(m => m.ID == id);
            if (mail == null)
            {
                return NotFound();
            }

            EditMail ma = new EditMail();
            ma.InitFromMail(mail);
            return View(ma);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditMail(int id,IFormFile Location, [Bind("ID,DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail )
        {
            if (id != mail.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var tmpmail = _context.Mail.AsNoTracking().SingleOrDefault(m => m.ID == id);
                    if(Location != null)
                    {
                         _logger.LogInformation(5, "houni location not null");
                        Del(tmpmail.Url) ;
                        mail.Url = Upload(Location).Result;

                        ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");

                        EditMail model = new EditMail();
                        model.InitFromMail(mail);
                        return View(model);

                    }
                    else
                    {
                        mail.Url = tmpmail.Url;
                    }
                    
                    _context.Update(mail);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
                return RedirectToAction("Mail", new {id = mail.DossierID});
            }

            EditMail ma = new EditMail();
            ma.InitFromMail(mail);
            return View(ma);
        }
        
        public IActionResult AddMail(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            if(!DossierExists(id.GetValueOrDefault()) )
            {
                return NotFound();
            }

            return View(new AddMail { DossierID = id.GetValueOrDefault() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMail(int id,IFormFile Location, [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail )
        {

            if (ModelState.IsValid)
            {
                try
                {
                    if(Location != null)
                    {
                        mail.Url = Upload(Location).Result;
                    }
                    
                    if(mail.Url == "")
                    {
                        AddMail model = new AddMail();
                        model.InitFromMail(mail);
                        ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
                        return View(model);
                    }
                    
                    _context.Add(mail);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
                return RedirectToAction("Mail", new {id = mail.DossierID});
            }

            AddMail ma = new AddMail();
            ma.InitFromMail(mail);
            return View(ma);
        }

        public IActionResult EditFina(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var finan = _context.InvInDossier.Include(d => d.Dossier)
                                             .SingleOrDefault( e => e.DossierID == id);

            if(finan == null)
            {
                var doc = _context.Dossier.FirstOrDefault( d => d.ID == id.GetValueOrDefault());
                return View(new AddFina {Financement = doc.Financement , DossierID = doc.ID  });
            }

            ViewData["ForeignInvestisseur"] = new SelectList(_context.ForeignInvestisseur, "ID", "Name" );

            return View(new AddFina {Foreign = finan.Dossier.Foreign , Financement = finan.Dossier.Financement , DossierID = id.GetValueOrDefault() , ForeignInvestisseurID = finan.ForeignInvestisseurID});
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditFina(string Foreign,int DossierID,Financement Financement,[Bind("DossierID,ForeignInvestisseurID")] InvInDossier indoc)
        {
            try
            {
                var inv = _context.InvInDossier.AsNoTracking().FirstOrDefault(s => s.DossierID == DossierID);
                if(inv != null)
                {
                    _context.Remove(inv);
                }
                return await AddFina(Foreign , Financement , indoc);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(3,ex.Message);
                return View(new AddFina {Foreign = Foreign , Financement = Financement , DossierID = indoc.DossierID , ForeignInvestisseurID = indoc.ForeignInvestisseurID});
            }

        }

        public IActionResult AddFina(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var doc = _context.Dossier.FirstOrDefault( d => d.ID == id.GetValueOrDefault());

            if(doc.Financement == Financement.Foreign || doc.Financement == Financement.Local || doc.Financement == Financement.Hybride)
            {
                return RedirectToAction("Index");
            }

            return View(new AddFina { DossierID = id.GetValueOrDefault() });

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddFina(string Foreign,Financement Financement,[Bind("DossierID,ForeignInvestisseurID")] InvInDossier indoc)
        {
            if (ModelState.IsValid)
            {
                try
                {
                   

                    if(indoc.ForeignInvestisseurID != 0)
                    {
                        try
                        {
                             _context.Remove(_context.InvInDossier.AsNoTracking().SingleOrDefault( e => e.DossierID == indoc.DossierID));
                        }
                        catch (Exception e ) 
                        { 
                             _logger.LogError(2 , e.Message);
                        }
                       
                        _context.Add(indoc);
                    }
                    
                    var dossier = _context.Dossier.SingleOrDefault(m => m.ID == indoc.DossierID );
                    dossier.Financement = Financement;
                    dossier.Foreign = Foreign;
                    _context.Update(dossier);

                    await _context.SaveChangesAsync();

                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                }
            }
            return View(new AddFina {Foreign = Foreign , Financement = Financement , DossierID = indoc.DossierID , ForeignInvestisseurID = indoc.ForeignInvestisseurID});
        }

        private bool DossierExists(int id)
        {
            return _context.Dossier.Any(e => e.ID == id);
        }

        private async Task<string> Upload(IFormFile Location)
        {
            var fileExt = System.IO.Path.GetExtension(Location.FileName);

            if(fileExt != ".pdf")
            {
                return "";
            }
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), Guid.NewGuid().ToString() + fileExt) ;
            try 
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Location.CopyToAsync(fileStream);
                }
                return Path.GetFileName(filePath);
            }
            catch(Exception )
            {
                return "";
            }    
        }

        private bool Del(string url)
        {
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), url ) ; 
            _logger.LogInformation(3,filePath);

            if(System.IO.File.Exists(filePath)) 
            {
                System.IO.File.Delete(filePath);
                _logger.LogInformation(3, "del file");
                return true;
            }
            return false;
        }

        private int GenerateNewNum()
        {
            try
            {
                var Num = _context.Dossier.Last();
                return Num.Num + 1;
            } 
            catch(Exception )
            {
                return 1;
            }
        }

        private void printError()
        {
            foreach (var pair in ModelState)
            {
                if (pair.Value.Errors.Count > 0)
                {
                    //errors[pair.Key] = pair.Value.Errors.Select(error => error.ErrorMessage).ToList();
                    _logger.LogError(3 , pair.Key);
                }
            }
        }
    }
}
