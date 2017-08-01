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
    public class InvestController : BaseCtrl
    {

        public InvestController(UserManager<ApplicationUser> userManager,
                            SignInManager<ApplicationUser> signInManager,
                            ApplicationDbContext db):
                            base(userManager,signInManager,db)  { }

        // GET: Invest
        public async Task<IActionResult> Index()
        {
            return View(await db.ForeignInvestisseur.ToListAsync());
        }

        // GET: Invest/Create
        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            if (ForeignInvestisseurExists(foreignInvestisseur.Name))
            {
                ModelState.AddModelError("Name", "الممول موجود");
                return View(foreignInvestisseur);
            }
            
            if (ModelState.IsValid)
            {
                db.Add(foreignInvestisseur);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(foreignInvestisseur);
        }


        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foreignInvestisseur = await db.ForeignInvestisseur.SingleOrDefaultAsync(m => m.ID == id);
            if (foreignInvestisseur == null)
            {
                return NotFound();
            }
            return View(foreignInvestisseur);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            if (id != foreignInvestisseur.ID)
            {
                return NotFound();
            }

            if (ForeignInvestisseurExists(foreignInvestisseur.Name))
            {
                ModelState.AddModelError("Name", "الممول موجود");
                return View(foreignInvestisseur);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(foreignInvestisseur);
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ForeignInvestisseurExists(foreignInvestisseur.ID))
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
            return View(foreignInvestisseur);
        }

        private bool ForeignInvestisseurExists(int id)
        {
            return db.ForeignInvestisseur.Any(e => e.ID == id);
        }
        private bool ForeignInvestisseurExists(string Name)
        {
            return db.ForeignInvestisseur.Any(e => e.Name == Name);
        }
    }
}
