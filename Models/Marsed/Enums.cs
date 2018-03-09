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

    public enum Method
    {
        [Display(Name = "مسبوق بانتقاء")]
        First = 1,
        [Display(Name = "طلب عروض مفتوح")]
        Open = 2,
        [Display(Name = "طلب عروض مضيق")]
        Close = 3,
        [Display(Name = "طلب عروض دولي")]
        International = 4,
        [Display(Name = "طلب عروض بتمويل")]
        WithFinancement = 5,
        [Display(Name = "إستشارة")]
        Consultation = 6,
        [Display(Name = "مناظرة")]
        Concour = 7,
        [Display(Name = "إتفاق مباشر")]
        AgreeDirect = 8,
        [Display(Name = "استشارة دولية")]
        ConsultationInternational = 9,
        [Display(Name = "طلب ترشحات")]
        DemandeSelection = 10,
        [Display(Name = "عقد")]
        Contra = 11,
        [Display(Name = "مناقصة")]
        Tender = 12
    }

    public enum MethodTri
    {
        [Display(Name = "طلبات عادية")]
        Normal = 1,
        [Display(Name = "طلبات معقدة")]
        Complex = 2
    }

}