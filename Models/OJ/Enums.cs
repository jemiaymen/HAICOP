using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace HAICOP.Models
{

    public enum GuestType
    {
        [Display(Name = "مراقب دولة")]
        Etat = 1,
        [Display(Name = "مراقب مصاريف")]
        Depense = 2,
        [Display(Name = "عضو قار")]
        Membre = 3,
        [Display(Name = "رئيس مدير عام")]
        PDG = 4,
        [Display(Name = "مدير عام")]
        DG = 5
    }

    public enum NatureDocument
    {
        [Display(Name = "إستدعاء")]
        Invitation = 1,
        [Display(Name = "جدول أعمال")]
        OJ = 2,
        [Display(Name = "جدول أعمال ملحق")]
        OJA = 3,
        [Display(Name = "مذكرة عمل")]
        FicheInstruction = 4,
        [Display(Name = "رأي الهيكل")]
        Avis = 5
    }



}