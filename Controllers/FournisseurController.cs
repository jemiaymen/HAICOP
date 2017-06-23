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
    public class FournisseurController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FournisseurController(ApplicationDbContext context)
        {
            _context = context;    
        }


        public async Task<IActionResult> Index()
        {
            return View(await _context.Fournisseur.ToListAsync());
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
                _context.Add(fournisseur);
                await _context.SaveChangesAsync();
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

            var fournisseur = await _context.Fournisseur.SingleOrDefaultAsync(m => m.ID == id);
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
                    _context.Update(fournisseur);
                    await _context.SaveChangesAsync();
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
            return _context.Fournisseur.Any(e => e.ID == id);
        }

        private bool FournisseurExists(string Lbl)
        {
            return _context.Fournisseur.Any(e => e.Lbl == Lbl);
        }
    }
}
