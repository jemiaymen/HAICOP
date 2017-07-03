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
    
    public class AutoCompController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AutoCompController(ApplicationDbContext context)
        {
            _context = context;    
        }

        [HttpGet]
        [Route("api/sug/invest")]
        public dynamic invest()
        {
            var result = _context.ForeignInvestisseur.Select(a => new {
                                                        value = a.Name,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/four")]
        public dynamic four()
        {
            var result = _context.Fournisseur.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/ach")]
        public dynamic acheteur()
        {
            var result = _context.Acheteur.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/comm")]
        public dynamic commission()
        {
            var result = _context.Commission.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/agent")]
        public dynamic agent()
        {
            var result = _context.Agent.Select(a => new {
                                                        value = a.Name,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/mail")]
        public dynamic mail()
        {
            var result = _context.Mail.Select(a => new {
                                                        value = a.Ref,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/docsub")]
        public dynamic docsub()
        {
            var result = _context.Dossier.Select(a => new {
                                                        value = a.Subject,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/docnum")]
        public dynamic docnum()
        {
            var result = _context.Dossier.Select(a => new {
                                                        value = a.Num,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }

        [HttpGet]
        [Route("api/sug/dess")]
        public dynamic dess()
        {
            var result = _context.Dessision.Select(a => new {
                                                        value = a.Lbl,
                                                        id = a.ID
                                                    }).ToList();
            return new {suggestions = result };
        }
    }
}