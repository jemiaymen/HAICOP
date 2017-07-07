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
            var applicationDbContext = _context.Dossier.Include(d => d.Commission);
            return View(await applicationDbContext.ToListAsync());
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

            var dossier = await _context.Dossier.SingleOrDefaultAsync(m => m.ID == id);
            if (dossier == null)
            {
                return NotFound();
            }
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", dossier.CommissionID);
            return View(dossier);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,CommissionID,Subject,Num,Year,Month,Type,Nature,Financement,DocDate,EnterDate,ProDate,TraitDate,TotalLocal,TotalForeign,Foreign")] Dossier dossier)
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
            ViewData["CommissionID"] = new SelectList(_context.Commission, "ID", "Lbl", dossier.CommissionID);
            return View(dossier);
        }

 
        private bool DossierExists(int id)
        {
            return _context.Dossier.Any(e => e.ID == id);
        }

        private async Task<string> Upload(IFormFile Location)
        {
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), Guid.NewGuid().ToString() + ".pdf") ;
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
    }
}
