using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace HAICOP.Controllers
{
    [Authorize(Roles = "root,Admin,BOC,Chef,President,assistant,Rapporteur")]
    public class DocController : BaseCtrl
    {

        private IHostingEnvironment _environment;
        private ILogger _logger;
        private string role ;

        public DocController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, 
                            IHostingEnvironment environment , ILoggerFactory loggerFactory ):
                            base(userManager,signInManager,db) 
        {
            _environment = environment;
            _logger = loggerFactory.CreateLogger<DocController>();
        }

        #region update style

        [Authorize(Roles = "root")]
        public IActionResult Delete()
        {
            ViewBag.Menu = "حذف ملف";
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "root")]
        public IActionResult Delete(int? ID)
        {
            ViewBag.Menu = "حذف ملف";
            if (ID == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.Find( ID = ID.GetValueOrDefault());

            if(doc == null)
            {
                return NotFound();
            }

            db.Remove(doc);
            db.SaveChanges();

            return RedirectToAction("Index", "Home");
        }

        private bool DossierExists(int id)
        {
            return db.Dossier.Any(e => e.ID == id);
        }

        private bool CommExists(int id)
        {
            return db.Commission.Any(e => e.ID == id);
        }

        private async Task<string> Upload(IFormFile Location)
        {
            var fileExt = System.IO.Path.GetExtension(Location.FileName);

            if (fileExt != ".pdf")
            {
                return "";
            }
            var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), Guid.NewGuid().ToString() + fileExt);
            try
            {
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Location.CopyToAsync(fileStream);
                }
                return Path.GetFileName(filePath);
            }
            catch (Exception)
            {
                return "";
            }
        }

        private bool Del(string url)
        {
            try
            {
                var filePath = Path.Combine(Path.Combine(_environment.WebRootPath, "uploads"), url);
                _logger.LogInformation(3, filePath);

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    _logger.LogInformation(3, "del file");
                    return true;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex.Message);
            }
            return false;
        }

        private void printError()
        {
            foreach (var pair in ModelState)
            {
                if (pair.Value.Errors.Count > 0)
                {
                    //errors[pair.Key] = pair.Value.Errors.Select(error => error.ErrorMessage).ToList();
                    _logger.LogError(3, pair.Key);
                }
            }
        }


        public IActionResult AddDescription(Desc model)
        {
            if (ModelState.IsValid)
            {
                db.Add(model);
                db.SaveChanges();
            }
            return RedirectToAction("Select","Doc",new { id = model.DossierID });
        }

        public IActionResult EditDescription(int? id)
        {
            ViewBag.Menu = "تحيين معطيات";
            if (id == null)
            {
                return NotFound();
            }

            var tmp = db.Desc.Include(d => d.Dossier).FirstOrDefault(a => a.ID == id.GetValueOrDefault());

            if (tmp == null)
            {
                return NotFound();
            }

            return View("EditDesc", tmp);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditDescription([Bind("ID,DossierID,Description")] Desc desc)
        {
            ViewBag.Menu = "تحيين معطيات";
            if (ModelState.IsValid)
            {
                db.Desc.Update(desc);
                db.SaveChanges();
                return RedirectToAction("Select", "Doc", new { id = desc.DossierID });
            }

            return View("EditDesc",desc);
        }


        public async Task<IActionResult> CommDetail(int? id)
        {
            ViewBag.Menu = "الهيكل";
            if (id == null)
            {
                return NotFound();
            }

            if (!CommExists(id.GetValueOrDefault()))
            {
                return NotFound();
            }

            role = (string)ViewBag.role.ToString();


            switch (role)
            {
                case "BOC":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() )
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .Where(r => r.Dossier.CommissionID == id.GetValueOrDefault())
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                case "assistant":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() )
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .Where(r => r.Dossier.CommissionID == id.GetValueOrDefault())
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm", re);

                    }
                case "root":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault())
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .Where(r => r.Dossier.CommissionID == id.GetValueOrDefault())
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm", re);

                    }
                default:
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault())
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .Where(r => r.Dossier.CommissionID == id.GetValueOrDefault())
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        ViewBag.Auth = true;
                        return View("_ListComm",re);
                    }

            }


        }

        public async Task<IActionResult> All()
        {
            ViewBag.Menu = "كل الملفات";

            role = (string)ViewBag.role.ToString();

            switch (role)
            {
                case "Boc":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Include(d => d.Acheteur)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();


                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                case "assistant":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Include(d => d.Acheteur)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();


                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                case "root":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Include(d => d.Acheteur)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

  
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                default:
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Include(d => d.Acheteur)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .Include(d => d.Dossier.Descriptions)
                                                      .ToListAsync();



                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);
                    }

            }
        }

        public async Task<IActionResult> Done(int? id)
        {
            ViewBag.Menu = "الملفات التي تم الإجابة عليها";

            role = (string)ViewBag.role.ToString();

            if(id == null)
            {
                switch (role)
                {
                    case "Boc":
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();

                            ViewBag.Auth = true;

                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);

                        }
                    case "assistant":
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();

                            ViewBag.Auth = true;

                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);

                        }
                    case "root":
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();

                            ViewBag.Auth = true;

                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);

                        }
                    default:
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();


                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);
                        }

                }
            }

            if (!CommExists(id.GetValueOrDefault()))
            {
                return NotFound();
            }

            switch (role)
            {
                case "Boc":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && (d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus ))
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm", re);

                    }
                case "assistant":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && (d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus))
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm", re);

                    }
                case "root":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && (d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus))
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm", re);

                    }
                default:
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && (d.Dossier.State == DossierState.Accept || d.Dossier.State == DossierState.Refus))
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm", re);
                    }

            }
        }

        public async Task<IActionResult> Index(int? id)
        {
            ViewBag.Menu = "الملفات الجارية";

            role = (string)ViewBag.role.ToString();

            if(id == null)
            {
                switch (role)
                {
                    case "Boc":
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();

                            ViewBag.Auth = true;

                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);

                        }
                    case "assistant":
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();

                            ViewBag.Auth = true;

                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);

                        }
                    case "root":
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();

                            ViewBag.Auth = true;

                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);

                        }
                    default:
                        {
                            var docs = await db.AchInDossier.Include(d => d.Dossier)
                                                .Include(d => d.Dossier.Commission)
                                                .Include(d => d.Acheteur)
                                                .Include(d => d.Dossier.Descriptions)
                                                .Where(d => d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                                .ToListAsync();

                            var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                          .Include(r => r.Dossier)
                                                          .ToListAsync();


                            List<DetailCommView> re = new List<DetailCommView>();

                            foreach (var d in docs)
                            {
                                re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                            }

                            return View("_ListComm", re);
                        }

                }
            }

            if (!CommExists(id.GetValueOrDefault()))
            {
                return NotFound();
            }

           

            switch (role)
            {
                case "Boc":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                case "assistant":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                case "root":
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;
                        ViewBag.Auth = true;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);

                    }
                default:
                    {
                        var docs = await db.AchInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Include(d => d.Acheteur)
                                            .Include(d => d.Dossier.Descriptions)
                                            .Where(d => d.Dossier.CommissionID == id.GetValueOrDefault() && d.Dossier.State != DossierState.Accept && d.Dossier.State != DossierState.Refus)
                                            .ToListAsync();

                        var rapp = await db.Rapporteur.Include(r => r.Agent)
                                                      .Include(r => r.Dossier)
                                                      .ToListAsync();

                        ViewBag.CommLbl = docs.First().Dossier.Commission.Lbl;

                        List<DetailCommView> re = new List<DetailCommView>();

                        foreach (var d in docs)
                        {
                            re.Add(new DetailCommView { Dossier = d, Metting = await db.DessisionInMetting.Include(a => a.Dessision).Include(m => m.Metting).Where(a => a.Metting.DossierID == d.DossierID).ToListAsync(), Rapporteur = rapp.FirstOrDefault(r => r.DossierID == d.DossierID), Fournisseur = db.FourInDossier.Where(f => f.DossierID == d.DossierID).Select(f => f.Fournisseur).ToList() });
                        }

                        return View("_ListComm",re);
                    }

            }
        }

        [Authorize(Roles = "BOC,Admin,root,assistant")]
        public IActionResult New()
        {
            ViewBag.Menu = "تسجيل ملف";

            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == id)
                                        .Select(a => a.Commission).ToList();
            if (comm.Count() < 1)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            }
            else
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl");
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            NewDossier model = new NewDossier();
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> New(int? FournisseurID, [Bind("ID,CommissionID,Subject,Type,Nature,DocDate,EnterDate,ProDate,AcheteurID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] NewDossier dossier)
        {
            ViewBag.Menu = "تسجيل ملف";

            if ((dossier.DocDate > dossier.ProDate) || (dossier.DocDate > dossier.EnterDate))
            {
                ModelState.AddModelError("DocDate", "يجب أن يكون تاريخ الملف أقل من تاريخ التعهد");
            }

            if (dossier.DocDate.DayOfWeek == DayOfWeek.Sunday || dossier.DocDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("DocDate", "يجب أن يكون تاريخ الملف داخل أوقات العمل ");
            }

            if (dossier.ProDate.DayOfWeek == DayOfWeek.Sunday || dossier.ProDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("ProDate", "يجب أن يكون تاريخ التعهد داخل أوقات العمل ");
            }

            if (dossier.EnterDate.DayOfWeek == DayOfWeek.Sunday || dossier.EnterDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("EnterDate", "يجب أن يكون تاريخ قبول الملف داخل أوقات العمل ");
            }



            ModelState.Remove("Url");

            printError();

            if (ModelState.IsValid)
            {

                try
                {
                    var num = await db.NextNum.FirstOrDefaultAsync(a => a.CommissionID == dossier.CommissionID);
                    decimal n = 0;
                    Decimal.TryParse(num.Next+ "", out n);
                    Dossier doc = new Dossier
                    {
                        CommissionID = dossier.CommissionID,
                        Subject = dossier.Subject,
                        Num = n,
                        Type = dossier.Type,
                        Nature = dossier.Nature,
                        DocDate = dossier.DocDate,
                        EnterDate = dossier.EnterDate,
                        ProDate = dossier.ProDate
                    };
                    db.Add(doc);
                    Mail mail = new Mail
                    {
                        Dossier = doc,
                        Ref = dossier.Ref,
                        OriginRef = dossier.OriginRef,
                        From = dossier.From,
                        MailType = dossier.MailType,
                        MailNature = dossier.MailNature,
                        MailDate = dossier.MailDate,
                        Desc = dossier.Desc
                    };

                    await db.SaveChangesAsync();
                    AchInDossier ach = new AchInDossier { Dossier = doc, AcheteurID = dossier.AcheteurID };
                    db.Add(ach);
                    db.Add(mail);
                    num.Next += 1;
                    db.Update(num);
                    if (FournisseurID != null)
                    {
                        var rap = new FourInDossier { Dossier = doc, FournisseurID = FournisseurID.GetValueOrDefault() };
                        await db.AddAsync(rap);
                    }

                    await db.SaveChangesAsync();
                    _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Add Dossier : { doc.ID} .");
                    return RedirectToAction("Select", new { id = doc.ID });
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(3, ex.Message);
                    throw;
                }


            }

            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == id)
                                        .Select(a => a.Commission).ToList();
            if (comm == null)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.CommissionID);
            }
            else
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", dossier.AcheteurID);
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            if (comm.Count() < 1)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            }
            else
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl");
            }

            return View(dossier);
        }

        [Authorize(Roles = "BOC,Admin,root,assistant")]
        public IActionResult NewWithNum()
        {
            ViewBag.Menu = "تسجيل ملف حالات خاصة";

            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == id)
                                        .Select(a => a.Commission).ToList();
            if (comm.Count() < 1)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            }
            else
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl");
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl");
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            NewDossier model = new NewDossier();
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> NewWithNum(int? FournisseurID, [Bind("ID,Num,CommissionID,Subject,Type,Nature,DocDate,EnterDate,ProDate,AcheteurID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] NewDossier dossier)
        {
            ViewBag.Menu = "تسجيل ملف حالات خاصة";

            if ((dossier.DocDate > dossier.ProDate) || (dossier.DocDate > dossier.EnterDate))
            {
                ModelState.AddModelError("DocDate", "يجب أن يكون تاريخ الملف أقل من تاريخ التعهد");
            }

            if (dossier.DocDate.DayOfWeek == DayOfWeek.Sunday || dossier.DocDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("DocDate", "يجب أن يكون تاريخ الملف داخل أوقات العمل ");
            }

            if (dossier.ProDate.DayOfWeek == DayOfWeek.Sunday || dossier.ProDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("ProDate", "يجب أن يكون تاريخ التعهد داخل أوقات العمل ");
            }

            if (dossier.EnterDate.DayOfWeek == DayOfWeek.Sunday || dossier.EnterDate.DayOfWeek == DayOfWeek.Saturday)
            {
                ModelState.AddModelError("EnterDate", "يجب أن يكون تاريخ قبول الملف داخل أوقات العمل ");
            }



            ModelState.Remove("Url");

            printError();

            if (ModelState.IsValid)
            {

                try
                {

                    Dossier doc = new Dossier
                    {
                        CommissionID = dossier.CommissionID,
                        Subject = dossier.Subject,
                        Num = dossier.Num,
                        Type = dossier.Type,
                        Nature = dossier.Nature,
                        DocDate = dossier.DocDate,
                        EnterDate = dossier.EnterDate,
                        ProDate = dossier.ProDate
                    };
                    db.Add(doc);
                    Mail mail = new Mail
                    {
                        Dossier = doc,
                        Ref = dossier.Ref,
                        OriginRef = dossier.OriginRef,
                        From = dossier.From,
                        MailType = dossier.MailType,
                        MailNature = dossier.MailNature,
                        MailDate = dossier.MailDate,
                        Desc = dossier.Desc
                    };

                    await db.SaveChangesAsync();
                    AchInDossier ach = new AchInDossier { Dossier = doc, AcheteurID = dossier.AcheteurID };
                    db.Add(ach);
                    db.Add(mail);
                    if (FournisseurID != null)
                    {
                        var rap = new FourInDossier { Dossier = doc, FournisseurID = FournisseurID.GetValueOrDefault() };
                        await db.AddAsync(rap);
                    }

                    await db.SaveChangesAsync();
                    _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Add Dossier : { doc.ID} .");
                    return RedirectToAction("Select", new { id = doc.ID });
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(3, ex.Message);
                    throw;
                }


            }

            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == id)
                                        .Select(a => a.Commission).ToList();
            if (comm == null)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.CommissionID);
            }
            else
            {
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", dossier.AcheteurID);
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

            return View(dossier);
        }



        public IActionResult Select(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }
            var dossier = db.Dossier.Include(c => c.Commission).Include( c => c.Mails).Include(d => d.Descriptions).SingleOrDefault(d => d.ID == id.GetValueOrDefault());
            if (dossier == null)
            {
                return NotFound();
            }

            role = (string)ViewBag.role.ToString();

            ViewBag.Menu = "ملف عدد : " + dossier.Num;

            ViewBag.Fournisseur = db.FourInDossier.Include(f => f.Fournisseur).Where(f => f.DossierID == id.GetValueOrDefault()).ToList();

            ViewBag.Avis = db.DessisionInMetting.Include(m => m.Metting)
                                                .Include(d => d.Dessision)
                                                .Where(c => c.Metting.DossierID == id.GetValueOrDefault()).ToList();

            try
            {
                ViewBag.Ach = db.AchInDossier.Include(a => a.Acheteur).FirstOrDefault(a => a.DossierID == id.GetValueOrDefault()).Acheteur;
            }
            catch (Exception)
            {

            }

            try
            {
                ViewBag.Rapporteur = db.Rapporteur.Include(a => a.Agent).SingleOrDefault(c => c.DossierID == id.GetValueOrDefault()).Agent;
            }
            catch(Exception){}
            

            switch (role)
            {

                case "Rapporteur":
                    {
                        if(HaveRightWrite(dossier.CommissionID))
                        {
                            return View(dossier);
                        }
                        return NotFound();
                    }
                case "Chef":
                    {
                        if (HaveRightWrite(dossier.CommissionID))
                        {
                            return View(dossier);
                        }
                        return NotFound();
                    }
                case "BOC":
                    {
                        ViewBag.isboc = true;
                        return View(dossier);
                    }
                case "Admin":
                    {
                        ViewBag.isadmin = true;
                        return View(dossier);
                    }
                case "root":
                    {
                        ViewBag.isadmin = true;
                        return View(dossier);
                    }
                case "President":
                    {
                        ViewBag.isadmin = true;
                        return View(dossier);
                    }
                case "assistant":
                    {
                        ViewBag.isadmin = true;
                        return View(dossier);
                    }
                default:
                    {
                        return View(dossier);
                    }
            }

        }

        [Authorize(Roles = "Admin,root,assistant,Chef,Rapporteur")]
        public async Task<IActionResult> Rapporteur(int? id)
        {
            ViewBag.Menu = "تكليف مقرر";

            if (id == null)
            {
                return NotFound();
            }

            if (!DossierExists(id.GetValueOrDefault()))
            {
                return NotFound();
            }

            Dossier doc = await db.Dossier.Include(d => d.Commission).FirstAsync(d => d.ID == id.GetValueOrDefault());

            ViewData["AgentID"] = new SelectList(db.Agent.Where(c => c.CommissionID == doc.CommissionID && c.IsPresident == false), "ID", "Name");

            return View(doc);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin,root,assistant,Chef,Rapporteur")]
        public async Task<IActionResult> Rapporteur( [Bind("DossierID,AgentID")] Rapporteur rapporteur)
        {
            ViewBag.Menu = "تكليف مقرر";
            if (ModelState.IsValid)
            {
                try
                {
                    var rap = await db.Rapporteur.FirstOrDefaultAsync(r => r.DossierID == rapporteur.DossierID);

                    if (rap != null)
                        db.Remove(rap);

                    await db.AddAsync(rapporteur);
                    await db.SaveChangesAsync();

                }
                catch(Exception )
                { }
                
                return RedirectToAction("Select", new { id = rapporteur.DossierID });
            }

            return View(rapporteur.DossierID);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Menu = "تحيين ملف";

            if (id == null)
            {
                return NotFound();
            }

            var dossier = await db.AchInDossier.Include(d => d.Dossier)
                                                        .Include(d => d.Acheteur)
                                                        .Include(c => c.Dossier.Commission)
                                                        .AsNoTracking()
                                                        .SingleOrDefaultAsync(m => m.DossierID == id);
            if (dossier == null)
            {
                return NotFound();
            }


            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", dossier.AcheteurID);
            ViewData["OldAcheteurID"] = dossier.AcheteurID;


            string userid = ViewBag.user.Id;

            role = (string)ViewBag.role.ToString();

            switch (role)
            {
                case "BOC":
                    {
                        var comm = db.UserCommission.Include(a => a.Commission)
                                            .Where(a => a.UserID == userid)
                        .AsNoTracking()
                                            .Select(a => a.Commission).ToList();
                        ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.Dossier.CommissionID);
                    }
                    break;
                default:
                    {
                        ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.Dossier.CommissionID);
                    }
                    break;
            }


            NewDossier doc = new NewDossier();
            doc.InitFromAchaInDossier(dossier);
            return View(doc);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, int AcheteurID, int OldAcheteurID, [Bind("ID,CommissionID,Subject,Type,Nature,DocDate,EnterDate,ProDate")] Dossier dossier)
        {
            ViewBag.Menu = "تحيين ملف";
            if (id != dossier.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var d = await db.Dossier.SingleOrDefaultAsync(a => a.ID == id);

                    d.CommissionID = dossier.CommissionID;
                    d.Subject = dossier.Subject;
                    d.Type = dossier.Type;
                    d.Nature = dossier.Nature;
                    d.DocDate = dossier.DocDate;
                    d.EnterDate = dossier.EnterDate;
                    d.ProDate = dossier.ProDate;

                    db.Update(d);

                    if (AcheteurID != OldAcheteurID)
                    {
                        var ach = await db.AchInDossier.SingleAsync(m => m.DossierID == dossier.ID && m.AcheteurID == OldAcheteurID);
                        db.Remove(ach);
                        db.Add(new AchInDossier { AcheteurID = AcheteurID, DossierID = dossier.ID });

                        _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Edit DossierID : { id} .");
                    }

                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DossierExists(dossier.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Select", new { id = id });
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", AcheteurID);

            string userid = ViewBag.user.Id;

            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user, "Admin");
            bool ispresident = await _userManager.IsInRoleAsync(ViewBag.user, "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user, "root");

            if (isboc)
            {
                var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == userid)
                                        .Select(a => a.Commission).ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }
            else if (ischef)
            {
                var comm = db.UserAgent.Include(a => a.Agent)
                                    .Include(a => a.Agent.Commission)
                                    .Where(a => a.UserID == userid && a.Agent.IsPresident == true)
                                    .Select(a => a.Agent.Commission)
                                    .ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }
            else if (isadmin || isroot || ispresident)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.CommissionID);
            }

            NewDossier doc = new NewDossier();
            doc.InitFromDossier(dossier, AcheteurID);
            return View(doc);
        }


        public async Task<IActionResult> EditWithNum(int? id)
        {
            ViewBag.Menu = "تحيين ملف";

            if (id == null)
            {
                return NotFound();
            }

            var dossier = await db.AchInDossier.Include(d => d.Dossier)
                                                        .Include(d => d.Acheteur)
                                                        .Include(c => c.Dossier.Commission)
                                                        .AsNoTracking()
                                                        .SingleOrDefaultAsync(m => m.DossierID == id);
            if (dossier == null)
            {
                return NotFound();
            }


            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", dossier.AcheteurID);
            ViewData["OldAcheteurID"] = dossier.AcheteurID;


            string userid = ViewBag.user.Id;

            role = (string)ViewBag.role.ToString();

            switch (role)
            {
                case "BOC":
                    {
                        var comm = db.UserCommission.Include(a => a.Commission)
                                            .Where(a => a.UserID == userid)
                        .AsNoTracking()
                                            .Select(a => a.Commission).ToList();
                        ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.Dossier.CommissionID);
                    }
                    break;
                default:
                    {
                        ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.Dossier.CommissionID);
                    }
                    break;
            }


            NewDossier doc = new NewDossier();
            doc.InitFromAchaInDossier(dossier);
            return View(doc);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditWithNum(int id, int AcheteurID, int OldAcheteurID, [Bind("ID,CommissionID,Num,Subject,Type,Nature,DocDate,EnterDate,ProDate")] Dossier dossier)
        {
            ViewBag.Menu = "تحيين ملف";
            if (id != dossier.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var d = await db.Dossier.SingleOrDefaultAsync(a => a.ID == id);

                    d.CommissionID = dossier.CommissionID;
                    d.Subject = dossier.Subject;
                    d.Type = dossier.Type;
                    d.Nature = dossier.Nature;
                    d.DocDate = dossier.DocDate;
                    d.EnterDate = dossier.EnterDate;
                    d.ProDate = dossier.ProDate;
                    d.Num = dossier.Num;

                    db.Update(d);

                    if (AcheteurID != OldAcheteurID)
                    {
                        var ach = await db.AchInDossier.SingleAsync(m => m.DossierID == dossier.ID && m.AcheteurID == OldAcheteurID);
                        db.Remove(ach);
                        db.Add(new AchInDossier { AcheteurID = AcheteurID, DossierID = dossier.ID });

                        _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Edit DossierID : { id} .");
                    }

                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DossierExists(dossier.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Select", new { id = id });
            }

            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "Lbl", AcheteurID);

            string userid = ViewBag.user.Id;

            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool isboc = await _userManager.IsInRoleAsync(ViewBag.user, "BOC");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user, "Admin");
            bool ispresident = await _userManager.IsInRoleAsync(ViewBag.user, "President");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user, "root");

            if (isboc)
            {
                var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == userid)
                                        .Select(a => a.Commission).ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }
            else if (ischef)
            {
                var comm = db.UserAgent.Include(a => a.Agent)
                                    .Include(a => a.Agent.Commission)
                                    .Where(a => a.UserID == userid && a.Agent.IsPresident == true)
                                    .Select(a => a.Agent.Commission)
                                    .ToList();
                ViewData["CommissionID"] = new SelectList(comm, "ID", "Lbl", dossier.CommissionID);
            }
            else if (isadmin || isroot || ispresident)
            {
                ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl", dossier.CommissionID);
            }

            NewDossier doc = new NewDossier();
            doc.InitFromDossier(dossier, AcheteurID);
            return View(doc);
        }


        public async Task<IActionResult> Mail(int? id)
        {
            ViewBag.Menu = "تحيين بريد";
            if (id == null)
            {
                return NotFound();
            }

            var mails = db.Mail.Include(d => d.Dossier)
                                            .Include(c => c.Dossier.Commission)
                                            .Where(m => m.DossierID == id);
            if (mails == null)
            {
                return NotFound();
            }


            return View(await mails.ToListAsync());
        }

        public IActionResult EditMail(int? id)
        {
            ViewBag.Menu = "تحيين بريد";
            if (id == null)
            {
                return NotFound();
            }

            var mail = db.Mail.SingleOrDefault(m => m.ID == id);
            if (mail == null)
            {
                return NotFound();
            }

            EditMail ma = new EditMail();
            ma.InitFromMail(mail);
            return View(ma);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditMail(int id, IFormFile Location, [Bind("ID,DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail)
        {
            if (id != mail.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    var tmpmail = db.Mail.AsNoTracking().SingleOrDefault(m => m.ID == id);
                    if (Location != null)
                    {
                        _logger.LogInformation(5, "houni location not null");
                        Del(tmpmail.Url);
                        mail.Url = Upload(Location).Result;

                    }
                    else
                    {
                        mail.Url = tmpmail.Url;
                    }

                    db.Update(mail);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Edit MailID {mail.ID} DossierID : { mail.DossierID} .");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
                return RedirectToAction("Mail", new { id = mail.DossierID });
            }

            EditMail ma = new EditMail();
            ma.InitFromMail(mail);
            ModelState.AddModelError("Location", "يقبل ملفات  (pdf)");
            return View(ma);
        }

        public IActionResult AddMail(int? id)
        {
            ViewBag.Menu = "إضافة بريد";
            if (id == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.FirstOrDefault(a => a.ID == id.GetValueOrDefault());

            if (doc == null)
            {
                return NotFound();
            }
            ViewData["AgentID"] = new SelectList(db.Agent.Where(a => a.CommissionID == doc.CommissionID && a.IsPresident == false), "ID", "Name");
            var rap = db.Rapporteur.FirstOrDefaultAsync(a => a.DossierID == id).Result;



            if (rap != null)
            {
                ViewBag.OldAgentID = rap.AgentID;
            }
            else
            {
                ViewBag.OldAgentID = 0;
            }

            return View(new AddMail { DossierID = id.GetValueOrDefault() });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddMail(int id, IFormFile Location, int AgentID, [Bind("DossierID,Ref,OriginRef,From,MailType,MailNature,MailDate,Desc")] Mail mail)
        {
            ViewBag.Menu = "إضافة بريد";
            ModelState.Remove("Url");
            if (ModelState.IsValid)
            {
                try
                {
                    if (Location != null)
                    {
                        mail.Url = await Upload(Location);
                    }
                    db.Add(mail);
                    await db.SaveChangesAsync();
                    _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Add Mail : { mail.ID}  DossierID : {mail.DossierID}.");
                    await Rapporteur(new Rapporteur { DossierID = mail.DossierID, AgentID = AgentID });
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                    throw;
                }
                return RedirectToAction("Mail", new { id = mail.DossierID });
            }

            AddMail ma = new AddMail();
            ma.InitFromMail(mail);
            return View(ma);
        }



        [Authorize(Roles = "root,Admin,President,assistant")]
        public IActionResult EditFina(int? id)
        {
            ViewBag.Menu = "تحيين التمويل";
            if (id == null)
            {
                return NotFound();
            }

            var finan = db.InvInDossier.Include(d => d.Dossier)
                                             .SingleOrDefault(e => e.DossierID == id);

            if (finan == null)
            {
                var doc = db.Dossier.FirstOrDefault(d => d.ID == id.GetValueOrDefault());
                return View(new AddFina { Financement = doc.Financement, DossierID = doc.ID });
            }

            ViewData["ForeignInvestisseur"] = new SelectList(db.ForeignInvestisseur, "ID", "Name");

            return View(new AddFina { Foreign = finan.Dossier.Foreign, Financement = finan.Dossier.Financement, DossierID = id.GetValueOrDefault(), ForeignInvestisseurID = finan.ForeignInvestisseurID });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "root,Admin,President,assistant")]
        public async Task<IActionResult> EditFina(string Foreign, int DossierID, Financement Financement, [Bind("DossierID,ForeignInvestisseurID")] InvInDossier indoc)
        {
            ViewBag.Menu = "تحيين التمويل";
            try
            {
                var inv = db.InvInDossier.AsNoTracking().FirstOrDefault(s => s.DossierID == DossierID);
                if (inv != null)
                {
                    db.Remove(inv);
                }
                return await AddFina(Foreign, Financement, indoc);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(3, ex.Message);
                return View(new AddFina { Foreign = Foreign, Financement = Financement, DossierID = indoc.DossierID, ForeignInvestisseurID = indoc.ForeignInvestisseurID });
            }

        }

        [Authorize(Roles = "root,Admin,President,assistant")]
        public IActionResult AddFina(int? id)
        {
            ViewBag.Menu = "إضافة التمويل";
            if (id == null)
            {
                return NotFound();
            }

            var doc = db.Dossier.FirstOrDefault(d => d.ID == id.GetValueOrDefault());

            if (doc.Financement == Financement.Foreign || doc.Financement == Financement.Local)
            {
                return RedirectToAction("Select", new { id = id });
            }

            return View(new AddFina { DossierID = id.GetValueOrDefault() });

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "root,Admin,President,assistant")]
        public async Task<IActionResult> AddFina(string Foreign, Financement Financement, [Bind("DossierID,ForeignInvestisseurID")] InvInDossier indoc)
        {
            ViewBag.Menu = "إضافة التمويل";
            if (ModelState.IsValid)
            {
                try
                {


                    if (indoc.ForeignInvestisseurID != 0)
                    {
                        try
                        {
                            db.Remove(db.InvInDossier.AsNoTracking().SingleOrDefault(e => e.DossierID == indoc.DossierID));
                        }
                        catch (Exception e)
                        {
                            _logger.LogError(2, e.Message);
                        }

                        db.Add(indoc);
                    }

                    var dossier = db.Dossier.SingleOrDefault(m => m.ID == indoc.DossierID);
                    dossier.Financement = Financement;
                    dossier.Foreign = Foreign;
                    db.Update(dossier);

                    await db.SaveChangesAsync();
                    _logger.LogDebug(1, $"User : {ViewBag.user.UserName} Edit Fina : { indoc.DossierID} .");

                    return RedirectToAction("Select", new { id = indoc.DossierID });
                }
                catch (Exception ex)
                {
                    _logger.LogInformation(5, ex.Message);
                }
            }
            return View(new AddFina { Foreign = Foreign, Financement = Financement, DossierID = indoc.DossierID, ForeignInvestisseurID = indoc.ForeignInvestisseurID });
        }



        private bool HaveRightWrite(int CommissionID)
        {
            string Id = ViewBag.user.Id;
            return db.UserAgent.Include(a => a.Agent).Where(a => a.UserID == Id).Select(a => a.Agent.CommissionID).Contains(CommissionID);
        }

        #endregion

    }
}
