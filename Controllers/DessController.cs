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
    public class DessController : BaseCtrl
    {


        public DessController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db):
                            base(userManager,signInManager,db) 
        { 
        }

        public async Task<IActionResult> Index()
        {
            return View(await db.Dessision.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Lbl")] Dessision dessision)
        {
            if(DessisionExists(dessision.Lbl))
            {
                ModelState.AddModelError("Lbl", " موجود");
                return View(dessision);
            }

            if (ModelState.IsValid)
            {
                db.Add(dessision);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(dessision);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dessision = await db.Dessision.SingleOrDefaultAsync(m => m.ID == id);
            if (dessision == null)
            {
                return NotFound();
            }
            return View(dessision);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl")] Dessision dessision)
        {
            if (id != dessision.ID)
            {
                return NotFound();
            }

            if(DessisionExists(dessision.Lbl))
            {
                ModelState.AddModelError("Lbl", " موجود");
                return View(dessision);
            }
            
            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(dessision);
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DessisionExists(dessision.ID))
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
            return View(dessision);
        }

        private bool DessisionExists(int id)
        {
            return db.Dessision.Any(e => e.ID == id);
        }

        private bool DessisionExists(string Lbl)
        {
            return db.Dessision.Any(e => e.Lbl == Lbl);
        }
    }
}
