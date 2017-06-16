using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using HAICOP.Data;

using HAICOP.Services;

namespace HAICOP.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FirstLastName { get; set; }
    }

    public class ApplicationRole : IdentityRole  
    {  
        public string Description { get; set; }   
    }  



}
