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
    [Authorize(Roles ="root,Admin,assistant")]
    public class AffectController : BaseCtrl
    {

        private readonly ILogger _logger;
        public AffectController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<AffectController>();
        }

        public async Task<IActionResult> Index()
        {
            string id = ViewBag.user.Id;

            var comm = db.UserCommission.Where( a => a.UserID == id )
                                        .Select(a => a.CommissionID).ToList();

            var re = await db.Dossier.Include(d => d.Commission)
                                     .Where( d => comm.Contains(d.CommissionID) &&  d.State != DossierState.Accept && d.State != DossierState.Refus )
                                     .ToListAsync();
            return View(re) ;
        }

        public async Task<IActionResult> Add(int? ID)
        {
            if(ID == null)
            {
                return NotFound();
            }

            if(!DossierExists(ID.GetValueOrDefault()))
            {
               return NotFound(); 
            }

            var tmp = await db.AchInDossier.Include(d => d.Dossier)
                                           .Include(d => d.Acheteur)
                                           .SingleOrDefaultAsync( d => d.DossierID == ID);

            BulletinView re = new BulletinView();

            re.InitFromDoc(tmp);
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl" );
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl"); 
            
            return View(re);
        }



        private bool DossierExists(int id)
        {
            return db.Dossier.Any(e => e.ID == id);
        }

    }
}