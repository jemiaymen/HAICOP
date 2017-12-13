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
    public class InvestController : BaseCtrl
    {
        private readonly ILogger _logger;
        public InvestController(UserManager<ApplicationUser> userManager,
                            SignInManager<ApplicationUser> signInManager,
                            ApplicationDbContext db,ILoggerFactory loggerFactory):
                            base(userManager,signInManager,db)  
        {
            _logger = loggerFactory.CreateLogger<InvestController>();
        }

        // GET: Invest
        public async Task<IActionResult> Index()
        {
            ViewBag.Menu = "تحيين ممول";
            return View(await db.ForeignInvestisseur.ToListAsync());
        }

        // GET: Invest/Create
        public IActionResult Create()
        {
            ViewBag.Menu = "إضافة ممول";
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            ViewBag.Menu = "إضافة ممول";
            if (ForeignInvestisseurExists(foreignInvestisseur.Name))
            {
                ModelState.AddModelError("Name", "الممول موجود");
                return View(foreignInvestisseur);
            }
            
            if (ModelState.IsValid)
            {
                db.Add(foreignInvestisseur);
                await db.SaveChangesAsync();
                 _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add ForeignINvestisseur : {foreignInvestisseur.Name} .");
                return RedirectToAction("Index");
            }
            return View(foreignInvestisseur);
        }


        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Menu = "تحيين ممول";
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
            ViewBag.Menu = "تحيين ممول";
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
                     _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit ForeignINvestisseurID : {foreignInvestisseur.ID} .");
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
