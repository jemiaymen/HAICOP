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

        public SearchController (UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager,ApplicationDbContext db, 
                                ILoggerFactory loggerFactory):
                                base(userManager,signInManager,db) 
        {
            _logger = loggerFactory.CreateLogger<SearchController>();
    
        }

        public IActionResult Index(string q)
        {
            int num = 0;
            Int32.TryParse(q, out num);
            var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .Where(d => d.Subject.Contains(q) || d.Commission.Lbl.Contains(q) || d.Num == num );

            List<DocDetail> re = new List<DocDetail>();
            foreach( var item in doc)
            {

                var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                 .Where( f => f.DossierID == item.ID)
                                                 .Select(f => f.Fournisseur)
                                                 .ToList();

                var tmp = new DocDetail { Dossier = item  };

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
                    var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                            .Include( d => d.Metting)
                                                            .SingleOrDefault( d => d.Metting.DossierID == item.ID).Dessision;
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

        public IActionResult Detail(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var doc =   db.Dossier.Include( d => d.Mails)
                                        .Include( d => d.Mettings)
                                        .Include( d => d.Commission)
                                        .FirstOrDefault(d => d.ID == id.GetValueOrDefault() );

            if(doc == null)
            {
                return NotFound();
            }

            DocDetail re = new DocDetail {Dossier = doc};

            try
            {
                var four = db.FourInDossier.Include( f => f.Fournisseur)
                                                 .Where( f => f.DossierID == doc.ID)
                                                 .ToList();
                re.FinD = four;
            }
            catch(Exception)
            {

            }

                
            try 
            {
                var achteur = db.AchInDossier.Include( a => a.Acheteur)
                                                    .SingleOrDefault( a => a.DossierID == doc.ID).Acheteur ;
                re.Acheteur = achteur;
            }
            catch(Exception)
            {

            }   

            try
            {
                var rapporteur = db.Rapporteur.Include( r => r.Agent)
                                                    .SingleOrDefault(a => a.DossierID == doc.ID).Agent;
                re.Rapporteur = rapporteur;
            }
            catch(Exception)
            {

            }

            try
            {
                var dessision = db.DessisionInMetting.Include( d => d.Dessision)
                                                            .Include( d => d.Metting)
                                                            .SingleOrDefault( d => d.Metting.DossierID == doc.ID).Dessision;
                re.Dessision = dessision;
            }
            catch(Exception)
            {

            }
                
                
                


            return View(re);
        }

    }
}