using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;
using HAICOP.Data;
using HAICOP.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace HAICOP.Controllers
{
    [Authorize]
    public class SearchController : BaseCtrl
    {

        private ILogger _logger;
        private string role;

        public SearchController (UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, 
                                ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<SearchController>();
    
        }

        public IActionResult Index(string q,int? ID,int? Date,int? Subject,int? Rapporteur,int? Fournisseur,int? Acheteur,Financement? Financement,int? DateRen,int? Dessision)
        {
            role = (string)ViewBag.role.ToString();

            if(role.Contains("Chef") || role.Contains("Rapporteur"))
            {
                return RedirectToAction("Index", "Home");
            }

            ViewBag.Menu = "نتيجة بحث";

            List<Dossier> doc = new List<Dossier>();
            int num = 0;
            DateTime d = new DateTime();

            if (ID != null)
            {
                Int32.TryParse(q, out num);
                doc = db.Dossier.Include(c => c.Commission).Where(c => c.Num == num).ToList();
            }


            if(Subject != null)
            {
                if(doc.Count == 0)
                {
                    doc = db.Dossier.Include(c => c.Commission).Where(c => c.Subject.Contains(q)).ToList();
                }
            }

            if(Date != null)
            {
                if(doc.Count == 0)
                {
                    DateTime.TryParse(q, out d);
                    doc = db.Dossier.Include(c => c.Commission).Where(c => c.ProDate == d).ToList();
                }
            }


            
            
            if(Rapporteur != null)
            {
                if(doc.Count == 0)
                {
                    doc = db.Rapporteur.Include(c => c.Dossier)
                                       .Include(c => c.Agent)
                                       .Where(a => a.Agent.Name.Contains(q)).Select(c => c.Dossier).ToList();
                }
            }


            if(Fournisseur != null)
            {
                if(doc.Count == 0)
                {
                    doc = db.FourInDossier.Include(c => c.Fournisseur)
                                          .Include(c => c.Dossier)
                                          .Where(c => c.Fournisseur.Lbl.Contains(q)).Select(c => c.Dossier).ToList();
                }
            }


            if (Acheteur != null)
            {
                if (doc.Count == 0)
                {
                    doc = db.AchInDossier.Include(c => c.Acheteur)
                                          .Include(c => c.Dossier)
                                          .Where(c => c.Acheteur.Lbl.Contains(q)).Select(c => c.Dossier).ToList();
                }
            }

            if (Financement != null)
            {
                if (doc.Count == 0)
                {
                    doc = db.Dossier.Include(c => c.Commission).Where(c => c.Financement == Financement).ToList();
                }
            }

            if (DateRen != null)
            {
                if (doc.Count == 0)
                {
                    DateTime.TryParse(q, out d);
                    doc = db.Metting.Include(c => c.Dossier)
                                    .Include(c => c.Dossier.Commission)
                                    .Where(c => c.MettDate == d).Select(c => c.Dossier).ToList();
                }
            }

            if (Dessision != null)
            {
                if (doc.Count == 0)
                {
                    doc = db.DessisionInMetting.Include(c => c.Metting)
                                               .Include(c => c.Dessision)
                                               .Include(c => c.Metting.Dossier)
                                               .Include(c => c.Metting.Dossier.Commission)
                                               .Where(c => c.Dessision.Lbl.Contains(q)).Select(c => c.Metting.Dossier).ToList();
                }
            }

            List<DocDetail> re = new List<DocDetail>();
            foreach( var item in doc)
            {

                var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                 .Where( f => f.DossierID == item.ID)
                                                 .Select(f => f.Fournisseur)
                                                 .ToList();
                var comm = db.Commission.FirstOrDefault( c => c.ID == item.CommissionID);
                var tmp = new DocDetail { Dossier = item ,Commission = comm };

                try
                {
                    var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                    .Single( a => a.DossierID == item.ID).Acheteur ;
                    tmp.Acheteur = achteur;
                }
                catch(Exception)
                {

                }
                

                try 
                {
                    var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                    .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                    tmp.Rapporteur = rapporteur;
                }
                catch(Exception)
                {

                }
                
                try 
                {
                    var dessision = db.DessisionInMetting.Include( c => c.Dessision)
                                                            .Include( c => c.Metting)
                                                            .SingleOrDefault( c => c.Metting.DossierID == item.ID).Dessision;
                    tmp.Dessision = dessision;
                }
                catch(Exception)
                {

                }
                

                if(four != null)
                {
                    tmp.Fournisseurs = four;
                }


                re.Add(tmp);
            }
                                        
            return View(re);
        }

        public IActionResult Get()
        {
            SearchAcheteur re = new SearchAcheteur();
            re.To = DateTime.Now;

            return View(re);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(DateTime To)
        {
            role = (string)ViewBag.role.ToString();

            string id = ViewBag.user.Id;
            var comm = db.UserCommission.Include(a => a.Commission)
                                        .Where(a => a.UserID == id)
                                        .Select(a => a.Commission.ID).ToList();

            ViewBag.Menu = ViewBag.user.FirstLastName;

            ViewBag.Menu1 = To.ToString("yyyy/MM/dd");

            List<Dossier> doc = new List<Dossier>();

            if (To != null)
            {
                doc = db.Dossier.Include(c => c.Commission).Where(c => c.ProDate == To && comm.Contains(c.CommissionID)).ToList();
            }
            else
            {
                return NotFound();
            }


            List<DocDetail> re = new List<DocDetail>();
            foreach (var item in doc)
            {

                var four = db.FourInDossier.Include(f => f.Fournisseur)
                                                 .Where(f => f.DossierID == item.ID)
                                                 .Select(f => f.Fournisseur)
                                                 .ToList();

                var tmp = new DocDetail { Dossier = item, Commission = item.Commission };

                try
                {
                    var achteur = db.AchInDossier.Include(a => a.Acheteur)
                                                    .Single(a => a.DossierID == item.ID).Acheteur;
                    tmp.Acheteur = achteur;
                }
                catch (Exception)
                {

                }


                try
                {
                    var rapporteur = db.Rapporteur.Include(r => r.Agent)
                                                    .SingleOrDefault(a => a.DossierID == item.ID).Agent;
                    tmp.Rapporteur = rapporteur;
                }
                catch (Exception)
                {

                }

                if (four != null)
                {
                    tmp.Fournisseurs = four;
                }


                re.Add(tmp);
            }

            return View(re);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Rapporteur(SearchRapp search)
        {
            ViewBag.Menu = "نتيجة بحث (المقرر)";
            if (ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["AgentID"] = new SelectList(db.Agent.Where(a => a.IsPresident == false).ToList(), "ID", "Name");

                        return View("Rapp",search);
                    }

                    var doc = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.AgentID == search.ID && 
                                         (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                   .ToList();
                    return View("Result",doc);
                }

                if(search.From != null)
                {
                    var res = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.AgentID == search.ID &&  d.Dossier.ProDate >= search.From   )
                                   .ToList();
                    return View("Result",res);
                }

                if(search.To != null)
                {
                    var rese = db.Rapporteur.Include( d => d.Dossier)
                                   .Include( d => d.Agent)
                                   .Include( d => d.Dossier.Commission)
                                   .Include(d => d.Dossier.Mettings)
                                   .Include(d => d.Dossier.Mails)
                                   .Where( d => d.AgentID == search.ID &&  d.Dossier.ProDate <= search.To   )
                                   .ToList();
                    return View("Result",rese);
                }

                var re = db.Rapporteur.Include( d => d.Dossier)
                                      .Include( d => d.Agent)
                                      .Include( d => d.Dossier.Commission)
                                      .Include(d => d.Dossier.Mettings)
                                      .Include(d => d.Dossier.Mails)
                                      .Where( d => d.AgentID == search.ID )
                                      .ToList();
                return View("Result",re);
            }
            return View("Result");
            
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Commission(SearchStruct search)
        {
            ViewBag.Menu = "نتيجة بحث (الهيكل)";
            if (ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");

                        return View("Struct",search);
                    }

                    var doc = db.Dossier.Include( d => d.Commission)
                                        .Include(d => d.Mettings)
                                        .Where( d => d.CommissionID == search.CommissionID && 
                                         (d.ProDate >= search.From && d.ProDate <= search.To) )
                                        .ToList();
                    return View("ResultStruct",doc);
                }

                if(search.From != null)
                {
                    var res = db.Dossier.Include( d => d.Commission)
                                        .Include(d => d.Mettings)
                                        .Where( d => d.CommissionID == search.CommissionID &&   d.ProDate >= search.From   )
                                        .ToList();
                    return View("ResultStruct",res);
                }

                if(search.To != null)
                {
                    var rese = db.Dossier.Include( d => d.Commission)
                                         .Include(d => d.Mettings)
                                         .Where( d => d.CommissionID == search.CommissionID &&   d.ProDate <= search.To   )
                                         .ToList();
                    return View("ResultStruct",rese);
                }

                var re =  db.Dossier.Include( d => d.Commission)
                                    .Include(d => d.Mettings)
                                    .Where( d => d.CommissionID == search.CommissionID )
                                      .ToList();
                return View("ResultStruct",re);
            }
            return View("ResultStruct");
            
        }
        public IActionResult Rapp()
        {
            ViewBag.Menu = "بحث مقرر";
            ViewData["AgentID"] = new SelectList(db.Agent.Where(a => a.IsPresident == false).ToList(), "ID", "Name");
            return View();
        }

        public IActionResult Struct()
        {
            ViewBag.Menu = "بحث هيكل";
            ViewData["CommissionID"] = new SelectList(db.Commission, "ID", "Lbl");
            return View();
        }

        public IActionResult Acheteur()
        {
            ViewBag.Menu = "بحث مشتري عمومي";
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "LblLong");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Acheteur(SearchAcheteur search)
        {
            ViewBag.Menu = "نتيجة بحث (المشتري العمومي)";
            if (ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "LblLong");

                        return View(search);
                    }

                    var doc = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID && 
                                                        (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                             .ToList();

                    return View("ResultAch",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID &&  d.Dossier.ProDate >= search.From   )
                                             .ToList();

                    return View("ResultAch",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID &&   d.Dossier.ProDate <= search.To)
                                             .ToList();

                    return View("ResultAch",doc2);
                }

                var doc3 = db.AchInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Acheteur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.AcheteurID == search.AcheteurID )
                                             .ToList();

                    return View("ResultAch",doc3);
            }
            ViewData["AcheteurID"] = new SelectList(db.Acheteur, "ID", "LblLong");
            return View();
        }

        public IActionResult Fournisseur()
        {
            ViewBag.Menu = "بحث صاحب الصفقة";
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Fournisseur(SearchFournisseur search)
        {
            ViewBag.Menu = "نتيجة بحث (صاحب الصفقة)";
            if (ModelState.IsValid)
            {
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");

                        return View(search);
                    }

                    var doc = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID && 
                                                        (d.Dossier.ProDate >= search.From && d.Dossier.ProDate <= search.To) )
                                             .ToList();

                    return View("Resultf",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID &&   d.Dossier.ProDate >= search.From   )
                                             .ToList();

                    return View("Resultf",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID &&    d.Dossier.ProDate <= search.To)
                                             .ToList();

                    return View("Resultf",doc2);
                }

                var doc3 = db.FourInDossier.Include( d => d.Dossier)
                                             .Include(d => d.Dossier.Commission)
                                             .Include(d => d.Fournisseur)
                                             .Include(d => d.Dossier.Mails)
                                             .Include(d => d.Dossier.Mettings)
                                             .Where(d => d.FournisseurID == search.FournisseurID )
                                             .ToList();

                    return View("Resultf",doc3);
            }
            ViewData["FournisseurID"] = new SelectList(db.Fournisseur, "ID", "Lbl");
            return View(search);
        }

        public IActionResult TypeFinancement()
        {
            ViewBag.Menu = "بحث طريقة التمويل";
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult TypeFinancement(SearchFina search)
        {
            ViewBag.Menu = "نتيجة بحث (التمويل)";
            if (ModelState.IsValid)
            {
                
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");

                        return View(search);
                    }

                    var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d =>  d.Financement == search.Financement &&
                                                    (d.ProDate >= search.From && d.ProDate <= search.To) )
                                        .ToList();

                    return View("ResultFore",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Financement == search.Financement &&  d.ProDate >= search.From  )
                                        .ToList();

                    return View("ResultFore",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Financement == search.Financement && d.ProDate <= search.To) 
                                        .ToList();

                    return View("ResultFore",doc2);
                }

                var doc3 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Financement == search.Financement  )
                                        .ToList();

                    return View("ResultFore",doc3);
            }
            return View(search);
        }

        public IActionResult ForeignInv()
        {
            ViewBag.Menu = "بحث الممول";
            ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ForeignInv(SearchForeign search)
        {
            ViewBag.Menu = "نتيجة بحث (الممول)";
            if (ModelState.IsValid)
            {
                
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");
                        ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");

                        return View(search);
                    }

                    var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign &&
                                                    (d.ProDate >= search.From && d.ProDate <= search.To) )
                                        .ToList();

                    return View("ResultFore",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign &&  d.ProDate >= search.From  )
                                        .ToList();

                    return View("ResultFore",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign && d.ProDate <= search.To) 
                                        .ToList();

                    return View("ResultFore",doc2);
                }

                var doc3 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Foreign.Contains(search.Foreign)  && d.Financement == Financement.Foreign  )
                                        .ToList();

                    return View("ResultFore",doc3);
            }

            ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");
            return View(search);
        }

        public IActionResult TypeDoc()
        {
            ViewBag.Menu = "بحث طبيعة الملف";
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult TypeDoc(SearchTypeDoc search)
        {
            ViewBag.Menu = "نتيجة بحث (طبيعة الملف)";
            if (ModelState.IsValid)
            {
                
                if(search.From != null && search.To != null)
                {
                    if(search.From > search.To)
                    {
                        ModelState.AddModelError("From","يجب أن يكون أصغر ");
                        ModelState.AddModelError("To","يجب أن يكون أكبر");

                        return View(search);
                    }

                    var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Type == search.Type &&
                                                    (d.ProDate >= search.From && d.ProDate <= search.To) )
                                        .ToList();

                    return View("ResultType",doc);
                }

                if(search.From != null)
                {
                    var doc1 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Type == search.Type &&  d.ProDate >= search.From  )
                                        .ToList();

                    return View("ResultType",doc1);
                }

                if(search.To != null)
                {
                    var doc2 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Type == search.Type && d.ProDate <= search.To) 
                                        .ToList();

                    return View("ResultType",doc2);
                }

                var doc3 = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.Type == search.Type  )
                                        .ToList();

                    return View("ResultType",doc3);
            }

            ViewData["Foreign"] = new SelectList(db.ForeignInvestisseur, "Name", "Name");
            return View(search);
        }

        
    }
}