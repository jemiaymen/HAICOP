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

namespace HAICOP.Controllers
{
    [Authorize(Roles ="root,Admin,Tech")]
    public class FournisseurController : BaseCtrl
    {

        
        public FournisseurController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db):
        base(userManager,signInManager,db) 
        {
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
                    db.Update(fournisseur);
                    await db.SaveChangesAsync();
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
