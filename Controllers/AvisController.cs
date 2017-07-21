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
    public class AvisController : Controller
    {
        private readonly ApplicationDbContext _context;
        private IHostingEnvironment _environment;
        private ILogger _logger;

        public AvisController(ApplicationDbContext context,IHostingEnvironment environment , ILoggerFactory loggerFactory)
        {
            _context = context;
            _environment = environment;
            _logger = loggerFactory.CreateLogger<AvisController>();
    
        }

        public async Task<IActionResult> Index()
        {
            var applicationDbContext =  _context.Dossier.Include(d => d.Commission)
                                                        .Include( d => d.Mails)
                                                        .Where( d => d.State != DossierState.Accept && d.State != DossierState.Refus );
            return View(await applicationDbContext.ToListAsync());
        }

        public IActionResult Accept(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var doc = _context.Dossier.Include( d => d.Commission)
                                      .FirstOrDefault(d => d.ID == id.GetValueOrDefault());

            if(doc == null)
            {
                return NotFound();
            }

            return View(doc);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Accept(int ID,int Num)
        {
            if(ModelState.IsValid)
            {
                var doc = _context.Dossier.FirstOrDefault(d => d.ID == ID && d.Num == Num);

                if(doc != null)
                {
                    try
                    {
                        doc.State = DossierState.Accept;
                        _context.Update(doc);
                        await _context.SaveChangesAsync();
                        return RedirectToAction("Rep","Doc");
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogError(3,ex.Message);
                        throw;
                    }

                    
                }
            }
            return Accept(ID);
        }

        public IActionResult Ref(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var doc = _context.Dossier.Include( d => d.Commission)
                                      .FirstOrDefault(d => d.ID == id.GetValueOrDefault());

            if(doc == null)
            {
                return NotFound();
            }

            return View(doc);

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Ref(int ID,int Num)
        {
            if(ModelState.IsValid)
            {
                var doc = _context.Dossier.FirstOrDefault(d => d.ID == ID && d.Num == Num);

                if(doc != null)
                {
                    try
                    {
                        doc.State = DossierState.Refus;
                        _context.Update(doc);
                        await _context.SaveChangesAsync();
                        return RedirectToAction("Rep","Doc");
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogError(3,ex.Message);
                        throw;
                    }

                    
                }
            }
            return Ref(ID);
        }


        public IActionResult ListEditFour(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var four = _context.FourInDossier.Include( f => f.Fournisseur)
                                             .Include(f => f.Dossier)
                                             .Include(f => f.Dossier.Commission)
                                             .Where( f => f.DossierID == id.GetValueOrDefault())
                                             .ToList();

 
            return View(four);
        }

        public IActionResult EditFour(int? fid , int? did)
        {
            if( fid ==  null || did == null)
            {
                return NotFound();
            }

            var four = _context.FourInDossier.Include( f => f.Fournisseur)
                                             .Include(f => f.Dossier)
                                             .SingleOrDefault( f => f.DossierID == did.GetValueOrDefault() && f.FournisseurID == fid);
            if( four == null)
            {
                return NotFound();
            }

            ViewData["FournisseurID"] = new SelectList(_context.Fournisseur, "ID", "Lbl");  

            var model = new AddFour();
            model.InitFromFinD(four);
            model.tmpFournisseurID = model.FournisseurID;

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditFour(int DossierID,int tmpFournisseurID,[Bind("DossierID,FournisseurID,Lbl,Montant,Foreign")] FourInDossier four )
        {
            if(ModelState.IsValid)
            {

                try
                {
                    if(tmpFournisseurID != four.FournisseurID)
                    {
                        _context.Remove( _context.FourInDossier.AsNoTracking().SingleOrDefault( f => f.DossierID == DossierID && f.FournisseurID == tmpFournisseurID ));
                        _context.Add(four);
                        await _context.SaveChangesAsync();
                    }
                    else 
                    {
                        _context.Update(four);
                        await _context.SaveChangesAsync();
                    }
                    return RedirectToAction("ListEditFour",new{ id = DossierID });
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(3,ex.Message);
                    throw;
                }
                
            }

            ViewData["FournisseurID"] = new SelectList(_context.Fournisseur, "ID", "Lbl");  

            var model = new AddFour();
            model.InitFromFinD(four);

            return View(model);
        }




        public IActionResult AddFour(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            if(!DossierExists(id.GetValueOrDefault()) )
            {
                return NotFound();
            }

            ViewData["FournisseurID"] = new SelectList(_context.Fournisseur, "ID", "Lbl");  
            return View( new AddFour { DossierID = id.GetValueOrDefault() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddFour(int DossierID,[Bind("DossierID,FournisseurID,Lbl,Montant,Foreign")] FourInDossier four  )
        {
            if(!DossierExists(DossierID) )
            {
                return NotFound();
            }

            if(ModelState.IsValid)
            {
                try
                {
                    _context.Add(four);
                    await _context.SaveChangesAsync();
                    return RedirectToAction("AddFour",new {id = DossierID});
                }
                catch (Exception ex)
                {
                    _logger.LogError(3,ex.Message);
                    throw;
                }
                
            }

            var err = new AddFour();
            err.InitFromFinD(four);
            return View(err);
        }


        public IActionResult Rep(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            if(!DossierExists(id.GetValueOrDefault()) )
            {
                return NotFound();
            }

            var met = _context.Metting.AsNoTracking().SingleOrDefault( m => m.DossierID == id.GetValueOrDefault());

            if(met == null)
            {
                ViewData["DessisionID"] = new SelectList(_context.Dessision, "ID", "Lbl");  
                return View( new AddAvis { DossierID = id.GetValueOrDefault() , MettNbr = 1  });
            }
            return RedirectToAction("Index","Doc");
            
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Rep(int DessisionID ,int DossierID,[Bind("DossierID,MettDate,MettNbr,MettDesc")] Metting metting , IFormFile Location, [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail  )
        {
            if(!DossierExists( DossierID))
            {
                return NotFound();
            }

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
                        AddAvis model = new AddAvis();
                        model.InitFromMail(mail);
                        model.InitFromMetting(metting);
                        ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
                        return View(model);
                    }
                    
                    _context.Add(mail);
                    _context.Add(metting);
                    _context.Add(new DessisionInMetting { DessisionID = DessisionID , Metting = metting});
                    var doc = await _context.Dossier.FindAsync(DossierID);
                    doc.State = DossierState.Traitement;
                    _context.Update(doc);
                    await _context.SaveChangesAsync();
                    return RedirectToAction("Index","Doc");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
            }

            AddAvis m = new AddAvis();
            m.InitFromMail(mail);
            m.InitFromMetting(metting);
            return View(m);
        }


        public IActionResult EditAvis(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }


            var doc = _context.Dossier.Include(d => d.Mails)
                                      .Include(d => d.Mettings)
                                      .FirstOrDefault(d => d.ID == id.GetValueOrDefault());
            if(doc == null)
            {
                return NotFound();
            }

            

            EditAvis model = new EditAvis();

            var mail = doc.Mails.LastOrDefault();
            var metting = doc.Mettings.LastOrDefault();
            var des = _context.DessisionInMetting.FirstOrDefault( m => m.MettingID == metting.ID);

            model.InitFromMail(mail);
            model.InitFromMetting(metting);

            model.MailID = mail.ID;
            model.MettingID = metting.ID;
            model.DessisionID = des.DessisionID;

            ViewData["DessisionID"] = new SelectList(_context.Dessision, "ID", "Lbl");  
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditAvis(int MailID,int MettingID,int DessisionID,int DossierID,[Bind("DossierID,MettDate,MettNbr,MettDesc")] Metting metting ,  [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail )
        {
            if (ModelState.IsValid)
            {

                mail.ID = MailID;
                metting.ID = MettingID;


                try
                {
                    _context.Update(mail);
                    _context.Update(metting);
                    _context.Remove( _context.DessisionInMetting.AsNoTracking().Single(s => s.MettingID == MettingID));
                    var dinm = new DessisionInMetting { DessisionID = DessisionID , MettingID = MettingID};
                    _context.Add(dinm);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(3, ex.Message);
                    throw;
                }

                return RedirectToAction("EditAvis", new {id = DossierID});
            }
            
            EditAvis m = new EditAvis();
            m.InitFromMail(mail);
            m.InitFromMetting(metting);

            m.MailID = mail.ID;
            m.MettingID = metting.ID;
            m.DessisionID = DessisionID;

            ViewData["DessisionID"] = new SelectList(_context.Dessision, "ID", "Lbl");  
            return View(m);
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

    }
}