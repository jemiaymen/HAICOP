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
    [Authorize(Roles ="root,Admin,Tech")]
    public class CommController : BaseCtrl
    {

        private readonly ILogger _logger;
        public CommController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db,ILoggerFactory loggerFactory):
                            base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<CommController>();
        }


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
                _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Add Commission : {commission.LblFr} .");
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
                    var com = await db.Commission.FindAsync(id);
                    com.Lbl = commission.Lbl;
                    com.LblFr = commission.LblFr;
                    com.HavePresident = commission.HavePresident;
                    com.Code = commission.Code;
                    db.Update(com);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1,$"User : {ViewBag.user.UserName} Edit CommissionID : {commission.ID} .");
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
