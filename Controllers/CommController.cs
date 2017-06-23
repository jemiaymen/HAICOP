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
    public class CommController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CommController(ApplicationDbContext context)
        {
            _context = context;    
        }


        public async Task<IActionResult> Index()
        {
            return View(await _context.Commission.ToListAsync());
        }

        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Lbl,LblFr,HavePresident")] Commission commission)
        {
            if(CommissionExists(commission.Lbl , commission.LblFr)){
                ModelState.AddModelError("Lbl", " موجود");
                ModelState.AddModelError("LblFr", " موجود");
                return View(commission);
            }
            
            if (ModelState.IsValid)
            {
                _context.Add(commission);
                await _context.SaveChangesAsync();
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

            var commission = await _context.Commission.SingleOrDefaultAsync(m => m.ID == id);
            if (commission == null)
            {
                return NotFound();
            }
            return View(commission);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Lbl,LblFr,HavePresident")] Commission commission)
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
                    _context.Update(commission);
                    await _context.SaveChangesAsync();
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
            return _context.Commission.Any(e => e.ID == id);
        }

        private bool CommissionExists(string Lbl, string LblFr)
        {
            return _context.Commission.Any(e => e.Lbl == Lbl && e.LblFr == LblFr);
        }
    }
}
