﻿using System;
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

namespace HAICOP.Controllers
{

    [Authorize]
    public class HomeController : BaseCtrl
    {
        private readonly ILogger _logger;
        public HomeController(UserManager<ApplicationUser> userManager,
                            SignInManager<ApplicationUser> signInManager,
                            ApplicationDbContext db,ILoggerFactory loggerFactory):
                            base(userManager,signInManager,db)  
        {
            _logger = loggerFactory.CreateLogger<HomeController>();
        }
        public async Task<IActionResult> Index()
        {
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
                              "المجلس"
            };

            bool ischef = await _userManager.IsInRoleAsync(ViewBag.user, "Chef");
            bool israpp = await _userManager.IsInRoleAsync(ViewBag.user, "Rapporteur");
            bool isroot = await _userManager.IsInRoleAsync(ViewBag.user, "root");
            bool isadmin = await _userManager.IsInRoleAsync(ViewBag.user, "Admin");
            bool ispresident = await _userManager.IsInRoleAsync(ViewBag.user, "President");

            var doc = db.Dossier.Include(d => d.Commission)
                                .Include(d => d.Mails)
                                .Include(d => d.Mettings)
                                .GroupBy( d => d.Commission.LblFr)
                                .Select( s => new DashboardComm {
                                        Count = s.Count() , 
                                        Lbl = s.Key , 
                                        Lst = s.ToList() ,
                                        Accept = s.Count(a => a.State == DossierState.Accept),
                                        Refu = s.Count(a => a.State == DossierState.Refus),
                                        NonTrait = s.Count(a => a.State != DossierState.Accept && a.State != DossierState.Refus)
                                }) ;

            string[] labels = {"info","red","lightBlue","Blue","green","yellow","brown","light-green","info","red","lightBlue","Blue"};

            ViewBag.labels = labels;

            ViewBag.i = 0;
            
            ViewBag.order = order;

            if(ischef)
            {

            }
            else if(israpp)
            {

            }
            else if(isroot || isadmin || ispresident)
            {
                return View(doc);
            }

            return View(new List<DashboardComm>());
        }

        [AllowAnonymous]
        public IActionResult Error(int? id)
        {
            if(id != null)
            {
                switch(id)
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

        public IActionResult MonthStat()
        {
            MonthStat m = new MonthStat();
            m.To = DateTime.Today;
            m.From = DateTime.Today;
            return View(m);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult MonthStat(MonthStat model)
        {
            if (ModelState.IsValid)
            {
                var doc = db.Dossier.Include(d => d.Commission)
                                        .Include(d => d.Mails)
                                        .Include(d => d.Mettings)
                                        .Where(d =>  d.TraitDate >= model.From && d.TraitDate <= model.To)
                                        .GroupBy( d => d.Commission.Lbl)
                                        .Select( s => new TestMonth {
                                                Count = s.Count() , 
                                                Lbl = s.Key , 
                                                Lst = s.ToList() ,
                                                Nbr = s.Select( a => a.Mettings.Sum(b => b.MettNbr)).Sum(),
                                                Montant = db.FourInDossier.Where( d => s.Select( a => a.ID).Contains(d.DossierID)).Sum( m => m.Montant)
                                             }) ;

                var type = db.Dossier.Include(d => d.Commission)
                                        .Where(d =>  d.TraitDate >= model.From && d.TraitDate <= model.To)
                                        .GroupBy( d => d.Type)
                                        .Select( s => new TestMonth {
                                                Count = s.Count() , 
                                                Lbl = s.Key.ToString() , 
                                                Lst = s.ToList() ,
                                                Montant = db.FourInDossier.Where( d => s.Select( a => a.ID).Contains(d.DossierID)).Sum( m => m.Montant)
                                             }) ;

                TestMonth tmp = new TestMonth { Count = doc.Sum(a => a.Count),Montant = doc.Sum(a => a.Montant), Nbr = doc.Sum( a => a.Nbr), Poucentage = 100 , Lbl ="المجموع"};
                
                ViewBag.Total = tmp;
                ViewBag.labels = JsonConvert.SerializeObject(doc.Select(a => a.Lbl).ToArray());
                ViewBag.data = JsonConvert.SerializeObject(doc.Select(a => a.Montant).ToArray() );

                ViewBag.labelstype = JsonConvert.SerializeObject(type.Select(a => a.Lbl).ToArray());
                ViewBag.datamontanttype = JsonConvert.SerializeObject(type.Select(a => a.Montant).ToArray() );
                ViewBag.datacounttype = JsonConvert.SerializeObject(type.Select(a => a.Count).ToArray() );

                List<TestMonth> re = new List<TestMonth>();
                float ForeignMontant = 0;
                int notok = 0;

                foreach(var i in doc)
                {
                    i.Poucentage = (i.Montant / tmp.Montant) * 100;
                    re.Add(i);
                    ForeignMontant += db.FourInDossier.Where( t => i.Lst.Where(c => c.Financement == Financement.Foreign).Select( a => a.ID).Contains(t.DossierID)).Sum( m => m.Montant);
                    notok += i.Lst.Where( a => a.State == DossierState.Refus).Count();
                }
                
                ViewBag.fp = (ForeignMontant / tmp.Montant) * 100;
                ViewBag.nok = ((float)notok / tmp.Count) * 100;

                return View("MonthStatResult",re);

            }
            return View(model);
        }



    }
}
