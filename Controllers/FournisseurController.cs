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
    [Authorize(Roles ="root,Admin,Tech,assistant")]
    public class FournisseurController : BaseCtrl
    {

        private readonly ILogger _logger;
        public FournisseurController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory):
        base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<FournisseurController>();
        }


        public async Task<IActionResult> Index()
        {
            return View(await db.Fournisseur.ToListAsync());
        }


        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Lbl")] Fournisseur fournisseur)
        {
            if (FournisseurExists(fournisseur.Lbl))
            {
                ModelState.AddModelError("Lbl", "المزود موجود");
                return View(fournisseur);
            }
            if (ModelState.IsValid)
            {
                db.Add(fournisseur);
                await db.SaveChangesAsync();
                _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Fournisseur : {fournisseur.Lbl} .");
                return RedirectToAction("Index");
            }
            return View(fournisseur);
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var fournisseur = await db.Fournisseur.SingleOrDefaultAsync(m => m.ID == id);
            if (fournisseur == null)
            {
                return NotFound();
            }
            return View(fournisseur);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl")] Fournisseur fournisseur)
        {
            if (id != fournisseur.ID)
            {
                return NotFound();
            }

            if (FournisseurExists(fournisseur.Lbl))
            {
                ModelState.AddModelError("Lbl", "المزود موجود");
                return View(fournisseur);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var four = await db.Fournisseur.FindAsync(id);
                    four.Lbl = fournisseur.Lbl;
                    db.Update(four);
                    await db.SaveChangesAsync();
                     _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit FournisseurID : {fournisseur.ID} .");
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FournisseurExists(fournisseur.ID))
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
            return View(fournisseur);
        }


        private bool FournisseurExists(int id)
        {
            return db.Fournisseur.Any(e => e.ID == id);
        }

        private bool FournisseurExists(string Lbl)
        {
            return db.Fournisseur.Any(e => e.Lbl == Lbl);
        }
    }
}
