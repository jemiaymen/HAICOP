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
    public class CommController : BaseCtrl
    {

        
        public CommController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db):
                            base(userManager,signInManager,db) 
        {}


        public async Task<IActionResult> Index()
        {
            return View(await db.Commission.Include(a => a.Agents).ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Lbl,LblFr,HavePresident,Code")] Commission commission)
        {
            if(CommissionExists(commission.Lbl , commission.LblFr)){
                ModelState.AddModelError("Lbl", " موجود");
                ModelState.AddModelError("LblFr", " موجود");
                return View(commission);
            }
            
            if (ModelState.IsValid)
            {
                db.Add(commission);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(commission);
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var commission = await db.Commission.SingleOrDefaultAsync(m => m.ID == id);
            if (commission == null)
            {
                return NotFound();
            }
            return View(commission);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl,LblFr,HavePresident,Code")] Commission commission)
        {
            if (id != commission.ID)
            {
                return NotFound();
            }

            if(CommissionExists(commission.Lbl , commission.LblFr)){
                ModelState.AddModelError("Lbl", " موجود");
                ModelState.AddModelError("LblFr", " موجود");
                return View(commission);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(commission);
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CommissionExists(commission.ID))
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
            return View(commission);
        }

        private bool CommissionExists(int id)
        {
            return db.Commission.Any(e => e.ID == id);
        }

        private bool CommissionExists(string Lbl, string LblFr)
        {
            return db.Commission.Any(e => e.Lbl == Lbl && e.LblFr == LblFr);
        }
    }
}
