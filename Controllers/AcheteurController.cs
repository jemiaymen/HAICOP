using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using HAICOP.Data;
using HAICOP.Models;

namespace HAICOP.Controllers
{
    public class AcheteurController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AcheteurController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Acheteur
        public async Task<IActionResult> Index()
        {
            return View(await _context.Acheteur.ToListAsync());
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
        public async Task<IActionResult> Create([Bind("ID,Lbl")] Acheteur acheteur)
        {
            if (AcheteurExists(acheteur.Lbl))
            {
                ModelState.AddModelError("Lbl", "المشتري العمومي موجود");
                return View(acheteur);
            }
            
            if (ModelState.IsValid)
            {
                _context.Add(acheteur);
                await _context.SaveChangesAsync();
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

            var acheteur = await _context.Acheteur.SingleOrDefaultAsync(m => m.ID == id);
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
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl")] Acheteur acheteur)
        {
            if (id != acheteur.ID)
            {
                return NotFound();
            }

            if (AcheteurExists(acheteur.Lbl))
            {
                ModelState.AddModelError("Lbl", "المشتري العمومي موجود");
                return View(acheteur);
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(acheteur);
                    await _context.SaveChangesAsync();
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
            return _context.Acheteur.Any(e => e.ID == id);
        }

        private bool AcheteurExists(string Lbl)
        {
            return _context.Acheteur.Any(e => e.Lbl == Lbl);
        }
    }
}
