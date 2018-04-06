using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace HAICOP.Models
{
    public enum NaturePrice
    {
        [Display(Name = "أسعار ثابتة")]
        Fixe = 1,
        [Display(Name = "أسعار قابلة للمراجعة")]
        Review = 2
    }

    public enum MethodPrice
    {
        [Display(Name = "أسعار فردية")]
        Alone = 1,
        [Display(Name = "أسعار جزافية")]
        Excessif = 2
    }

    public enum MethodTri
    {
        [Display(Name = "طلبات عادية")]
        Normal = 1,
        [Display(Name = "طلبات معقدة")]
        Complex = 2
    }

    public enum Valeur
    {

        [Display(Name = "تقييم على اساس العرض الاقل ثمنا")]
        MoinsCher = 1,
        [Display(Name = " تقييم على اساس الموازنة بين الكلفة و الجودة")]
        CoutQualite = 2,
        [Display(Name = " تقييم على اساس الجودة")]
        Qualite = 3

    }

}