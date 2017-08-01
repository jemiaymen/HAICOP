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
    public class AcheteurController : BaseCtrl
    {

        public AcheteurController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db):
                                base(userManager,signInManager,db) 
        {}

        // GET: Acheteur
        public async Task<IActionResult> Index()
        {
            return View(await db.Acheteur.ToListAsync());
        }


        // GET: Acheteur/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Acheteur/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Lbl,LblLong")] Acheteur acheteur)
        {
            if (AcheteurExists(acheteur.Lbl,acheteur.LblLong))
            {
                ModelState.AddModelError("Lbl", "المشتري العمومي موجود");
                return View(acheteur);
            }
            
            if (ModelState.IsValid)
            {
                db.Add(acheteur);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(acheteur);
        }

        // GET: Acheteur/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var acheteur = await db.Acheteur.SingleOrDefaultAsync(m => m.ID == id);
            if (acheteur == null)
            {
                return NotFound();
            }
            return View(acheteur);
        }

        // POST: Acheteur/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl,LblLong")] Acheteur acheteur)
        {
            if (id != acheteur.ID)
            {
                return NotFound();
            }

            if (AcheteurExists(acheteur.Lbl,acheteur.LblLong))
            {
                ModelState.AddModelError("Lbl", "المشتري العمومي موجود");
                return View(acheteur);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(acheteur);
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AcheteurExists(acheteur.ID))
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
            return View(acheteur);
        }


        private bool AcheteurExists(int id)
        {
            return db.Acheteur.Any(e => e.ID == id);
        }

        private bool AcheteurExists(string Lbl , string LblLong)
        {
            return db.Acheteur.Any(e => e.Lbl == Lbl && e.LblLong == LblLong);
        }
    }
}
