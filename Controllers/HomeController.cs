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
                              "المجلس الوطني للطلب العمومي",
                              "الهيئة العليا للطلب العمومي"
            };


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

        public IActionResult Ind()
        {
            ViewBag.Menu = "الملفات الجارية";

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
                              "المجلس الوطني للطلب العمومي",
                              "الهيئة العليا للطلب العمومي"
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
                              "المجلس الوطني للطلب العمومي",
                              "الهيئة العليا للطلب العمومي"
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



        public IActionResult MonthStat(bool New)
        {
            ViewBag.Menu = "الإحصائيات";
            MonthStat m = new MonthStat();
            m.To = DateTime.Today;
            m.From = DateTime.Today;
            if(New)
                return View("MonthStatNew",m);
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
                decimal ForeignMontant = 0;
                List<TestMonth> result = new List<TestMonth>();

                var all = db.FourInDossier.Include(d => d.Dossier)
                                          .Include(d => d.Dossier.Commission)
                                          .Include(d => d.Dossier.Mettings)
                                          .Include(d => d.Fournisseur)
                                          .Where(d => d.Dossier.TraitDate >= model.From && d.Dossier.TraitDate <= model.To
                                          && cms.Contains(d.Dossier.CommissionID));

                

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

                var docnot = db.Dossier.Include(d => d.Mails)
                                        .Where(d => d.TraitDate >= model.From && d.TraitDate <= model.To &&
                                                d.Mails.Any(a => a.MailNature == MailNature.NonComform)).Count();

                var notok = db.Dossier.Include(d => d.Mails)
                                        .Where(d => d.TraitDate >= model.From && d.TraitDate <= model.To &&
                                                d.Mails.Any(a => a.MailNature == MailNature.Refu)).Count();

                foreach (int i in cms)
                {
                    result.Add(GetResult(all, i));
                }

                TestMonth total = new TestMonth { Count = result.Sum(a => a.Count), Montant = result.Sum(a => a.Montant), Nbr = result.Sum(a => a.Nbr), Poucentage = 100, Lbl = "المجموع" };

                foreach (var i in result)
                {
                    i.Poucentage = (i.Montant / total.Montant) * 100;
                    ForeignMontant += db.FourInDossier.Where(g => i.Lst.Where(c => c.Financement == Financement.Foreign).Select(a => a.ID).Contains(g.DossierID)).Sum(m => m.Montant);
                }

                ViewBag.labels = JsonConvert.SerializeObject(result.Select(a => a.Lbl).ToArray());
                ViewBag.data = JsonConvert.SerializeObject(result.Select(a => Double.Parse(a.Montant.ToString("F0"), NumberStyles.Float, CultureInfo.InvariantCulture)).ToArray());

                ViewBag.labelstype = JsonConvert.SerializeObject(type.Select(a => a.Lbl).ToArray());
                ViewBag.datamontanttype = JsonConvert.SerializeObject(type.Select(a => Double.Parse(a.Montant.ToString("F0"), NumberStyles.Float, CultureInfo.InvariantCulture)).ToArray());
                ViewBag.datacounttype = JsonConvert.SerializeObject(type.Select(a => a.Count).ToArray());

                ViewBag.fp = (ForeignMontant / total.Montant) * 100;
                ViewBag.foreign = ForeignMontant;
                ViewBag.nok = ((float)notok / total.Count) * 100;
                ViewBag.notok = notok;
                ViewBag.not = docnot;
                ViewBag.nnot = ((float)docnot / total.Count) * 100;

                result.Add(total);

                return View("MonthStatResult", result);
            }

            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult MonthStatNew(MonthStat model)
        {
            ViewBag.Menu = "الإحصائيات";
            if (ModelState.IsValid)
            {
                int[] cms = { 1, 2, 5, 6 };
                decimal ForeignMontant = 0;
                List<TestMonth> result = new List<TestMonth>();

                var all = db.FourInDossier.Include(d => d.Dossier)
                                          .Include(d => d.Dossier.Commission)
                                          .Include(d => d.Fournisseur)
                                          .Where(d => d.MettingDate >= model.From && d.MettingDate <= model.To
                                          && cms.Contains(d.Dossier.CommissionID));



                var type =  db.FourInDossier.Include(d => d.Dossier)
                                            .Include(d => d.Dossier.Commission)
                                            .Where(d => d.MettingDate >= model.From && d.MettingDate <= model.To && cms.Contains(d.Dossier.CommissionID))
                                            .GroupBy(d => d.Dossier.Type)
                                            .Select(s => new TestMonth
                                            {
                                                Count = s.Count(),
                                                Lbl = s.Key.ToString(),
                                                Montant = db.FourInDossier.Where(d => s.Select(a => a.DossierID).Contains(d.DossierID)).Sum(m => m.Montant)
                                            });

                var docnot = db.Dossier.Include(d => d.Mails)
                                        .Where(d => d.TraitDate >= model.From && d.TraitDate <= model.To &&
                                                d.Mails.Any(a => a.MailNature == MailNature.NonComform)).Count();

                var notok = db.Dossier.Include(d => d.Mails)
                                        .Where(d => d.TraitDate >= model.From && d.TraitDate <= model.To &&
                                                d.Mails.Any(a => a.MailNature == MailNature.Refu)).Count();

                foreach (int i in cms)
                {
                    result.Add(GetResult(all, i));
                }

                TestMonth total = new TestMonth { Count = result.Sum(a => a.Count), Montant = result.Sum(a => a.Montant), Nbr = result.Sum(a => a.Nbr), Poucentage = 100, Lbl = "المجموع" };

                foreach (var i in result)
                {
                    if(i.Count > 0)
                    {
                        i.Poucentage = (i.Montant / total.Montant) * 100;
                        ForeignMontant += db.FourInDossier.Where(g => i.Lst.Where(c => c.Financement == Financement.Foreign).Select(a => a.ID).Contains(g.DossierID)).Sum(m => m.Montant);
                    }
                    
                }

                ViewBag.labels = JsonConvert.SerializeObject(result.Select(a => a.Lbl).ToArray());
                ViewBag.data = JsonConvert.SerializeObject(result.Select(a => Double.Parse(a.Montant.ToString("F0"), NumberStyles.Float, CultureInfo.InvariantCulture)).ToArray());

                ViewBag.labelstype = JsonConvert.SerializeObject(type.Select(a => a.Lbl).ToArray());
                ViewBag.datamontanttype = JsonConvert.SerializeObject(type.Select(a => Double.Parse(a.Montant.ToString("F0"), NumberStyles.Float, CultureInfo.InvariantCulture)).ToArray());
                ViewBag.datacounttype = JsonConvert.SerializeObject(type.Select(a => a.Count).ToArray());

                ViewBag.fp = (ForeignMontant / total.Montant) * 100;
                ViewBag.foreign = ForeignMontant;
                ViewBag.nok = ((float)notok / total.Count) * 100;
                ViewBag.notok = notok;
                ViewBag.not = docnot;
                ViewBag.nnot = ((float)docnot / total.Count) * 100;

                result.Add(total);

                return View("MonthStatResult", result);
            }

            return View(model);
        }


        public IActionResult MonthStatDetail(bool New)
        {
            ViewBag.Menu = " الإحصائيات التفصيل";
            MonthStat m = new MonthStat();
            m.To = DateTime.Today;
            m.From = DateTime.Today;
            if (New)
                return View("MonthStatDetailNew", m);
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult MonthStatDetailNew(MonthStat model)
        {
            ViewBag.Menu = " الإحصائيات التفصيل";

            if (ModelState.IsValid)
            {

                int[] cms = { 1, 2, 5, 6 };
                var all = db.FourInDossier.Include(d => d.Dossier)
                                           .Include(d => d.Dossier.Commission)
                                           .Include(d => d.Fournisseur)
                                           .Where(d => d.MettingDate >= model.From && d.MettingDate <= model.To
                                           && cms.Contains(d.Dossier.CommissionID) && d.Montant > 0);

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


        private TestMonth GetResult(IQueryable<FourInDossier> all,int CommissionID)
        {

            var com = all.Where(d => d.Dossier.CommissionID == CommissionID && d.Montant > 0);

            try
            {
                return new TestMonth { Lst = com.Select(d => d.Dossier).ToList(), Count = com.GroupBy(a => a.DossierID).Count(), Lbl = com.FirstOrDefault().Dossier.Commission.Lbl, Nbr = com.GroupBy(a => a.MettingDate).Count(), Montant = com.Sum(a => a.Montant) };
            }
            catch (Exception)
            {
                return new TestMonth();

            }
        }
    }
}
