using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace HAICOP.Controllers
{
    [Authorize]
    public class PrintController : BaseCtrl
    {

        private ILogger _logger;

        public PrintController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
             _logger = loggerFactory.CreateLogger<PrintController>();
        }

        public async Task<IActionResult> Index()
        {
            var applicationDbContext = db.Agent.Include(a => a.Commission);
            return View(await applicationDbContext.ToListAsync());
        }

        [Authorize(Roles="BOC,Chef,root,President,Admin")]
        public async Task<IActionResult> Boc(int? id)
        {
            _logger.LogDebug(1,id + "");
            
            if(id == null)
            {
                return NotFound();
            }
            var doc = await db.Dossier.Include(d => d.Commission)
                                .Include(d => d.Mails)
                                .FirstOrDefaultAsync(d => d.ID == id.GetValueOrDefault());
            if(doc == null)
            {
                return NotFound();
            }

            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                          .FirstOrDefaultAsync( r => r.DossierID == id.GetValueOrDefault());
            var pres = await db.Agent.FirstOrDefaultAsync( p => p.CommissionID == doc.CommissionID && p.IsPresident == true);
           
            if(doc.CommissionID == 3)
            {
                var four = await db.FourInDossier.Include( f => f.Fournisseur).FirstOrDefaultAsync( f => f.DossierID == id.GetValueOrDefault());

                if(four != null)
                {
                    ViewBag.Four = four.Fournisseur.Lbl;
                }
            }
            

            if( rapp != null)
            {
                ViewBag.Rapporteur = rapp.Agent.Name;
            }
            if( pres != null)
            {
                ViewBag.Chef = pres.Name;
            }

            return View(doc);
        }

        [Authorize(Roles="BOC,Chef,root,President,Admin")]
        public async Task<IActionResult> Bureau(int? id ,int? mid)
        {      
            if(id == null || mid == null)
            {
                return NotFound();
            }
            var doc = await db.Dossier.Include(d => d.Commission)
                                .Include(d => d.Mails)
                                .FirstOrDefaultAsync(d => d.ID == id.GetValueOrDefault());
            if(doc == null)
            {
                return NotFound();
            }

            var mail = doc.Mails.FirstOrDefault( a => a.ID == mid);

            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                          .FirstOrDefaultAsync( r => r.DossierID == id.GetValueOrDefault());
            var pres = await db.Agent.FirstOrDefaultAsync( p => p.CommissionID == doc.CommissionID && p.IsPresident == true);

            if(doc.CommissionID == 3)
            {
                var four = await db.FourInDossier.Include( f => f.Fournisseur).FirstOrDefaultAsync( f => f.DossierID == id.GetValueOrDefault());

                if(four != null)
                {
                    ViewBag.Four = four.Fournisseur.Lbl;
                }
            }
            
            if( rapp != null)
            {
                ViewBag.Rapporteur = rapp.Agent.Name;
            }
            if( pres != null)
            {
                ViewBag.Chef = pres.Name;
            }

            if(mail != null)
            {
                ViewBag.Mail = mail;
            }

            return View(doc);
        }
    }
}
