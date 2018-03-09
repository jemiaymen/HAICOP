using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{
    public class OJViewGenerate
    {
        public OJ OJ { get; set; }
        public List<DocInOJ> Doc { get; set; }
        public List<Member> Membre { get; set; }
    }

}