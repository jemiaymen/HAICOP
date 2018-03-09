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
    [Authorize(Roles ="root,Admin,assistant,Chef,Rapporteur")]
    public class MarsedController : BaseCtrl
    {

        private readonly ILogger _logger;
        public MarsedController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<MarsedController>();
        }

        public async Task<IActionResult> Info(int? id)
        {
            if(id == null)
            {
                return NotFound();
            }

            var doc = await db.AchInDossier.Include(d => d.Dossier).Include(a => a.Acheteur).FirstOrDefaultAsync(a => a.DossierID == id.GetValueOrDefault());

            if(doc == null)
            {
                return NotFound();
            }

            InfoView info = new InfoView();
            info.InitFromDoc(doc);

            return View(info) ;
        }

    }
}