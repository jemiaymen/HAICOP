using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using HAICOP.Models;
using HAICOP.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Globalization;

namespace HAICOP.Controllers
{

    [Authorize]
    public class HomeController : BaseCtrl
    {
        private readonly ILogger _logger;
        private string role;
        public HomeController(UserManager<ApplicationUser> userManager,
                            SignInManager<ApplicationUser> signInManager,
                            ApplicationDbContext db, ILoggerFactory loggerFactory) :
                            base(userManager, signInManager, db)
        {
            _logger = loggerFactory.CreateLogger<HomeController>();
        }

        #region update style
        public IActionResult Index()
        {
            ViewBag.Menu = "الملفات الواردة";
            string[] order = {"البناءات والهندسة المدنية",
                              "تكنولوجيات الإتصال و الإعلامية والكهرباء",
                              "الطلبات المختلفة",
                              "المواد الأولية",
                              "نيابة المحامين",
                              "هيئة المتابعة والمراجعة",
                              "لجنة الإقصاء",
                              "المرصد",
                              "الشراءت على الخط",
                              "فض النزاعات",
                              "المجلس الوطني للطلب العمومي"
            };

            role = (string)ViewBag.role.ToString();




            var doc = db.Dossier.Include(d => d.Commission)
                                .Include(d => d.Mails)
                                .Include(d => d.Mettings)
                                .GroupBy(d => d.Commission.LblFr)
                                .Select(s => new DashboardComm
                                {
                                    Count = s.Count(),
                                    Lbl = s.Key,
                                    Lst = s.ToList(),
                                    Accept = s.Count(a => a.State == DossierState.Accept),
                                    Refu = s.Count(a => a.State == DossierState.Refus),
                                    Petition = s.Count(a => a.Nature == DossierNature.Petition),
                                    PetitionOk = s.Count(a => a.Nature == DossierNature.Petition && a.State == DossierState.Accept),
                                    PetitionNotOk = s.Count(a => a.Nature == DossierNature.Petition && a.State == DossierState.Refus),
                                    NonTrait = s.Count(a => a.State != DossierState.Accept && a.State != DossierState.Refus),
                                    Montant = db.FourInDossier.Where(d => s.Select(a => a.ID).Contains(d.DossierID)).Sum(m => m.Montant)
                                });


            ViewBag.order = order;

            ViewBag.Montant = doc.Sum(a => a.Montant);

            ViewBag.NumberAll = doc.Sum(a => a.Accept);

            ViewBag.Petition = doc.Sum(a => a.Petition);

            ViewBag.PetitionOk = doc.Sum(a => a.PetitionOk);

            ViewBag.PetitionNotOk = doc.Sum(a => a.PetitionNotOk);


            switch (role)
            {
                case "Chef":
                    return RedirectToAction("Dashboard", "Doc");
                default:
                    {
                        var re = new List<DashboardComm>();

                        if (doc.Count() > 0)
                        {
                            foreach (string s in order)
                            {
                                var tmp = doc.FirstOrDefault(a => a.Lbl == s);

                                if (tmp != null)
                                {
                                    var insert = new DashboardComm { Lbl = s };
                                    insert.Init(tmp);
                                    insert.CommissionID = tmp.Lst.First().CommissionID;
                                    re.Add(insert);
                                }
                                else
                                {
                                    re.Add(new DashboardComm { Lbl = s, CommissionID = db.Commission.Where(d => d.Lbl.Contains(s)).Select(c => c.ID).First() });
                                }
                            }

                            return View(re);
                        }
                        else
                        {
                            foreach (string s in order)
                            {
                                re.Add(new DashboardComm { Lbl = s, CommissionID = db.Commission.Where(d => d.Lbl.Contains(s)).Select(c => c.ID).First() });
                            }

                            return View(re);

                        }
                    }

            }
        }

        public IActionResult Ind()
        {
            ViewBag.Menu = "المافات الجارية";

            string[] order = {"البناءات والهندسة المدنية",
                              "تكنولوجيات الإتصال و الإعلامية والكهرباء",
                              "الطلبات المختلفة",
                              "المواد الأولية",
                              "نيابة المحامين",
                              "هيئة المتابعة والمراجعة",
                              "لجنة الإقصاء",
                              "المرصد",
                              "الشراءت على الخط",
                              "فض النزاعات",
                              "المجلس الوطني للطلب العمومي"
            };

            role = (string)ViewBag.role.ToString();




            var doc = db.Dossier.Include(d => d.Commission)
                                .Include(d => d.Mails)
                                .Include(d => d.Mettings)
                                .GroupBy(d => d.Commission.LblFr)
                                .Select(s => new DashboardComm
                                {
                                    Count = s.Count(),
                                    Lbl = s.Key,
                                    Lst = s.ToList(),
                                    NonTrait = s.Count(a => a.State != DossierState.Accept && a.State != DossierState.Refus)
                                });


            ViewBag.order = order;

            switch (role)
            {
                case "Chef":
                    return RedirectToAction("Dashboard", "Doc");
                default:
                    {
                        var re = new List<DashboardComm>();

                        if (doc.Count() > 0)
                        {
                            foreach (string s in order)
                            {
                                var tmp = doc.FirstOrDefault(a => a.Lbl == s);

                                if (tmp != null)
                                {
                                    var insert = new DashboardComm { Lbl = s };
                                    insert.Init(tmp);
                                    insert.CommissionID = tmp.Lst.First().CommissionID;
                                    re.Add(insert);
                                }
                                else
                                {
                                    re.Add(new DashboardComm { Lbl = s, CommissionID = db.Commission.Where(d => d.Lbl.Contains(s)).Select(c => c.ID).First() });
                                }
                            }

                            return View(re);
                        }
                        else
                        {
                            foreach (string s in order)
                            {
                                re.Add(new DashboardComm { Lbl = s, CommissionID = db.Commission.Where(d => d.Lbl.Contains(s)).Select(c => c.ID).First() });
                            }

                            return View(re);

                        }
                    }

            }
        }

        public IActionResult Done()
        {
            ViewBag.Menu = "الملفات التي تم الإجابة عليها";

            string[] order = {"البناءات والهندسة المدنية",
                              "تكنولوجيات الإتصال و الإعلامية والكهرباء",
                              "الطلبات المختلفة",
                              "المواد الأولية",
                              "نيابة المحامين",
                              "هيئة المتابعة والمراجعة",
                              "لجنة الإقصاء",
                              "المرصد",
                              "الشراءت على الخط",
                              "فض النزاعات",
                              "المجلس الوطني للطلب العمومي"
            };

            role = (string)ViewBag.role.ToString();




            var doc = db.Dossier.Include(d => d.Commission)
                                .Include(d => d.Mails)
                                .Include(d => d.Mettings)
                                .GroupBy(d => d.Commission.LblFr)
                                .Select(s => new DashboardComm
                                {
                                    Count = s.Count(),
                                    Lbl = s.Key,
                                    Lst = s.ToList(),
                                    Accept = s.Count(a => a.State == DossierState.Accept),
                                    Refu = s.Count(a => a.State == DossierState.Refus)
                                });


            ViewBag.order = order;


            switch (role)
            {
                case "Chef":
                    return RedirectToAction("Dashboard", "Doc");
                default:
                    {
                        var re = new List<DashboardComm>();

                        if (doc.Count() > 0)
                        {
                            foreach (string s in order)
                            {
                                var tmp = doc.FirstOrDefault(a => a.Lbl == s);

                                if (tmp != null)
                                {
                                    var insert = new DashboardComm { Lbl = s };
                                    insert.Init(tmp);
                                    insert.CommissionID = tmp.Lst.First().CommissionID;
                                    re.Add(insert);
                                }
                                else
                                {
                                    re.Add(new DashboardComm { Lbl = s, CommissionID = db.Commission.Where(d => d.Lbl.Contains(s)).Select(c => c.ID).First() });
                                }
                            }

                            return View(re);
                        }
                        else
                        {
                            foreach (string s in order)
                            {
                                re.Add(new DashboardComm { Lbl = s, CommissionID = db.Commission.Where(d => d.Lbl.Contains(s)).Select(c => c.ID).First() });
                            }

                            return View(re);

                        }
                    }

            }
        }

        [AllowAnonymous]
        public IActionResult Error(int? id)
        {
            if (id != null)
            {
                switch (id)
                {
                    case 404:
                        return View("404");
                    case 501:
                        return View("501");
                    case 500:
                        return View("500");
                    default:
                        return View("404");

                }
            }
            return View("404");
        }

        #endregion



        public IActionResult MonthStat()
        {
            ViewBag.Menu = "الإحصائيات";
            MonthStat m = new MonthStat();
            m.To = DateTime.Today;
            m.From = DateTime.Today;
            return View(m);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult MonthStat(MonthStat model)
        {
            ViewBag.Menu = "الإحصائيات";
            if (ModelState.IsValid)
            {
                int[] cms = {1,2,5,6};

                var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mettings)
                                        .Where(d => d.TraitDate >= model.From && d.TraitDate <= model.To && cms.Contains(d.CommissionID))
                                        .GroupBy(d => d.Commission.Lbl)
                                        .Select(s => new TestMonth
                                        {
                                            Count = s.Count(),
                                            Lbl = s.Key,
                                            Lst = s.ToList(),
                                            Nbr = db.Metting.Where(b => s.Select(a => a.ID).Contains(b.DossierID)).GroupBy(b => b.MettDate).Count(),
                                            Montant = db.FourInDossier.Where(d => s.Select(a => a.ID).Contains(d.DossierID)).Sum(m => m.Montant)
                                        }).ToList();

                var type = db.Dossier.Include(d => d.Commission)
                                        .Where(d => d.TraitDate >= model.From && d.TraitDate <= model.To && cms.Contains(d.CommissionID))
                                        .GroupBy(d => d.Type)
                                        .Select(s => new TestMonth
                                        {
                                            Count = s.Count(),
                                            Lbl = s.Key.ToString(),
                                            Lst = s.ToList(),
                                            Montant = db.FourInDossier.Where(d => s.Select(a => a.ID).Contains(d.DossierID)).Sum(m => m.Montant)
                                        });
                TestMonth total = new TestMonth { Count = doc.Sum(a => a.Count), Montant = doc.Sum(a => a.Montant), Nbr = doc.Sum(a => a.Nbr), Poucentage = 100, Lbl = "المجموع" };

                ViewBag.labels = JsonConvert.SerializeObject(doc.Select(a => a.Lbl).ToArray());
                ViewBag.data = JsonConvert.SerializeObject(doc.Select(a => Double.Parse(a.Montant.ToString("F0"), NumberStyles.Float, CultureInfo.InvariantCulture)).ToArray());

                ViewBag.labelstype = JsonConvert.SerializeObject(type.Select(a => a.Lbl).ToArray());
                ViewBag.datamontanttype = JsonConvert.SerializeObject(type.Select(a => Double.Parse(a.Montant.ToString("F0"), NumberStyles.Float, CultureInfo.InvariantCulture)).ToArray());
                ViewBag.datacounttype = JsonConvert.SerializeObject(type.Select(a => a.Count).ToArray());

                List<TestMonth> re = new List<TestMonth>();
                decimal ForeignMontant = 0;
                int notok = 0;

                foreach (var i in doc)
                {
                    i.Poucentage = (i.Montant / total.Montant) * 100;
                    ForeignMontant += db.FourInDossier.Where(t => i.Lst.Where(c => c.Financement == Financement.Foreign).Select(a => a.ID).Contains(t.DossierID)).Sum(m => m.Montant);
                    notok += i.Lst.Where(a => a.State == DossierState.Refus).Count();
                }

                ViewBag.fp = (ForeignMontant / total.Montant) * 100;
                ViewBag.nok = ((float)notok / total.Count) * 100;
                doc.Add(total);
                return View("MonthStatResult", doc);
            }

            return View(model);
        }


        public IActionResult MonthStatDetail()
        {
            ViewBag.Menu = " الإحصائيات التفصيل";
            MonthStat m = new MonthStat();
            m.To = DateTime.Today;
            m.From = DateTime.Today;
            return View(m);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult MonthStatDetail(MonthStat model)
        {
            ViewBag.Menu = " الإحصائيات التفصيل";

            if (ModelState.IsValid)
            {

                int[] cms = { 1, 2, 5, 6 };
                var all = db.FourInDossier.Include(d => d.Dossier)
                                           .Include(d => d.Dossier.Commission)
                                           .Include(d => d.Dossier.Mettings)
                                           .Include(d => d.Fournisseur)
                                           .Where(d => d.Dossier.TraitDate >= model.From && d.Dossier.TraitDate <= model.To
                                           && cms.Contains(d.Dossier.CommissionID));

                var rapport = all.Where(d => d.Dossier.Nature == DossierNature.Rapport);

                var avenant = all.Where(d => d.Dossier.Nature != DossierNature.Rapport);

                ViewBag.Avenant = avenant;
                
                return View("MonthStatResultDetail", rapport);
            }

            return View(model);
        }

        private void InitBase()
        {
            var docs = db.Dossier.Include(a => a.Commission).Include(a => a.Mettings).Include(a => a.Mails).ToList();

            foreach( var doc in docs)
            {
                var m = doc.Mails.LastOrDefault( a => a.MailType == MailType.In);
                Metting n = new Metting();

                if(doc.Mettings.Count > 0)
                {
                    n = doc.Mettings.Last();
                }

                if( n.ID != 0)
                {
                    if(m != null)
                    {
                        m.MettingID = n.ID;
                        db.Update(m);
                        db.SaveChanges();
                    }
                    
                }
            }
        }

    }
}
