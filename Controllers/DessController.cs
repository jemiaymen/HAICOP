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
    public class DessController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DessController(ApplicationDbContext context)
        {
            _context = context;    
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Dessision.ToListAsync());
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
                _context.Add(dessision);
                await _context.SaveChangesAsync();
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

            var dessision = await _context.Dessision.SingleOrDefaultAsync(m => m.ID == id);
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
                    _context.Update(dessision);
                    await _context.SaveChangesAsync();
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
            return _context.Dessision.Any(e => e.ID == id);
        }

        private bool DessisionExists(string Lbl)
        {
            return _context.Dessision.Any(e => e.Lbl == Lbl);
        }
    }
}
