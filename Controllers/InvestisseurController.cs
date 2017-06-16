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
    public class InvestisseurController : Controller
    {
        private readonly ApplicationDbContext _context;

        public InvestisseurController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Investisseur
        public async Task<IActionResult> Index()
        {
            return View(await _context.ForeignInvestisseur.ToListAsync());
        }

        // GET: Investisseur/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foreignInvestisseur = await _context.ForeignInvestisseur
                .SingleOrDefaultAsync(m => m.ID == id);
            if (foreignInvestisseur == null)
            {
                return NotFound();
            }

            return View(foreignInvestisseur);
        }

        // GET: Investisseur/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Investisseur/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            if (ModelState.IsValid)
            {
                _context.Add(foreignInvestisseur);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(foreignInvestisseur);
        }

        // GET: Investisseur/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foreignInvestisseur = await _context.ForeignInvestisseur.SingleOrDefaultAsync(m => m.ID == id);
            if (foreignInvestisseur == null)
            {
                return NotFound();
            }
            return View(foreignInvestisseur);
        }

        // POST: Investisseur/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,Name")] ForeignInvestisseur foreignInvestisseur)
        {
            if (id != foreignInvestisseur.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(foreignInvestisseur);
                    await _context.SaveChangesAsync();
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

        // GET: Investisseur/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var foreignInvestisseur = await _context.ForeignInvestisseur
                .SingleOrDefaultAsync(m => m.ID == id);
            if (foreignInvestisseur == null)
            {
                return NotFound();
            }

            return View(foreignInvestisseur);
        }

        // POST: Investisseur/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var foreignInvestisseur = await _context.ForeignInvestisseur.SingleOrDefaultAsync(m => m.ID == id);
            _context.ForeignInvestisseur.Remove(foreignInvestisseur);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool ForeignInvestisseurExists(int id)
        {
            return _context.ForeignInvestisseur.Any(e => e.ID == id);
        }
    }
}
