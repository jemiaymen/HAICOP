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
    [Authorize(Roles = "root,Admin,Tech,assistant,BOC,President")]
    public class AcheteurController : BaseCtrl
    {

        private readonly ILogger _logger;
        public AcheteurController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<AcheteurController>();
        }

        // GET: Acheteur
        public async Task<IActionResult> Index()
        {
            ViewBag.Menu = "تحيين مشتري عمومي";
            return View(await db.Acheteur.ToListAsync());
        }


        // GET: Acheteur/Create
        public IActionResult Create()
        {
            ViewBag.Menu = "إضافة مشتري عمومي";
            return View();
        }

        // POST: Acheteur/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Lbl,Nature")] Acheteur acheteur)
        {
            ViewBag.Menu = "إضافة مشتري عمومي";
            if (AcheteurExists(acheteur.Lbl))
            {
                ModelState.AddModelError("Lbl", "المشتري العمومي موجود");
                return View(acheteur);
            }
            
            if (ModelState.IsValid)
            {
                db.Add(acheteur);
                await db.SaveChangesAsync();
                _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Acheteur : {acheteur.Lbl} .");

                return RedirectToAction("Index");
            }
            return View(acheteur);
        }

        // GET: Acheteur/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Menu = "تحيين مشتري عمومي";
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
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl,Nature")] Acheteur acheteur)
        {
            ViewBag.Menu = "تحيين مشتري عمومي";
            if (id != acheteur.ID)
            {
                return NotFound();
            }


            if (ModelState.IsValid)
            {
                try
                {
                    var ach = await db.Acheteur.FindAsync(id);
                    ach.Lbl = acheteur.Lbl;
                    ach.Nature = acheteur.Nature;

                    db.Update(ach);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit Acheteur : {acheteur.Lbl} .");
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

        private bool AcheteurExists(string Lbl)
        {
            return db.Acheteur.Any(e => e.Lbl == Lbl );
        }
    }
}
