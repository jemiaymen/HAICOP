using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace HAICOP.Controllers
{
    [Authorize]
    public class GuestController : BaseCtrl
    {

        private ILogger _logger;

        public GuestController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ApplicationDbContext db,
                            ILoggerFactory loggerFactory):
                            base(userManager,signInManager,db)
        {
            _logger = loggerFactory.CreateLogger<AvisController>();

        }

        public IActionResult Index()
        {
            ViewBag.Menu = "قائمة الزوار";
            ViewBag.Acheteur = db.GuestInAcheteur.Include(a => a.Acheteur).ToList<GuestInAcheteur>();
            return View(db.Guest);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Menu = "تحيين زائر";
            if (id == null)
            {
                return NotFound();
            }

            if(!GuestExists(id.GetValueOrDefault()))
            {
                return NotFound();
            }

            var guest = await db.Guest.SingleOrDefaultAsync(m => m.ID == id);
            var ach = await db.GuestInAcheteur.SingleOrDefaultAsync(a => a.GuestID == guest.ID);
            if(ach != null)
            {
                ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", ach.AcheteurID);
            }
            else
            {
                ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
            }
            
            return View(guest);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id,int? AcheteurID, [Bind("ID,FirstLastName,Type,Email,Tel,Fix,Desc")] Guest guest)
        {
            ViewBag.Menu = "تحيين زائر";
            if (!ModelState.IsValid)
            {
                ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", AcheteurID.GetValueOrDefault());
                return View(guest);
            }

            if (id != guest.ID)
            {
                return NotFound();
            }

            db.Entry(guest).State = EntityState.Modified;

            try
            {
                var ach = await db.GuestInAcheteur.SingleOrDefaultAsync(a => a.GuestID == guest.ID);
                if(ach != null)
                {
                    db.Remove(ach);
                }
                
                db.Add(new GuestInAcheteur { GuestID = id.GetValueOrDefault(), AcheteurID = AcheteurID.GetValueOrDefault() });

                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestExists(id.GetValueOrDefault()))
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

        public IActionResult Add()
        {
            ViewBag.Menu = "إضافة زائر";
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Add(int? AcheteurID,[Bind("FirstLastName,Type,Email,Tel,Fix,Desc")] Guest guest)
        {
            ViewBag.Menu = "إضافة زائر";
            
            if (!ModelState.IsValid)
            {
                ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
                return View(guest);
            }

            db.Guest.Add(guest);
            await db.SaveChangesAsync();

            if(AcheteurID != null && AcheteurExists(AcheteurID.GetValueOrDefault()))
            {
                db.GuestInAcheteur.Add(new GuestInAcheteur { AcheteurID = AcheteurID.GetValueOrDefault(), Guest = guest });
                await db.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        private bool GuestExists(int id)
        {
            return db.Guest.Any(e => e.ID == id);
        }

        private bool AcheteurExists(int id)
        {
            return db.Acheteur.Any(e => e.ID == id);
        }
    }
}