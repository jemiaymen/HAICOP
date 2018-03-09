using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{
    public class InfoView
    {
        [Required(ErrorMessage = "اجباري")]
        public int DossierID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الموضوع")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 12)]
        public string Subject { get; set; }

        #region acheteur

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "المشتري العمومي")]
        public int AcheteurID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الهاتف")]
        [DataType(DataType.PhoneNumber)]
        public string Tel { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الفاكس")]
        [DataType(DataType.PhoneNumber)]
        public string Fax { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم المسؤول و لقبه")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string FirstLastName { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "العنوان الالكتروني")]
        [DataType(DataType.PhoneNumber)]
        public string Email { get; set; }

        #endregion

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة الصفقة")]
        public DossierType Type { get; set; }

        [Display(Name = "صفقة مخصصة لفائدة المؤسسات الصغرى")]
        public bool IsSmall { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "المبلغ")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        public decimal TotalLocal { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "التمويل")]
        public Financement Financement { get; set; }

        [Display(Name = "عدد الأقساط")]
        public int NbrLot { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "طريقة الإبرام")]
        public Method Method { get; set; }

        #region fournisseur

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "صاحب الصفقة")]
        public int FournisseurID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "جنسيته")]
        public string Nationalite { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "النشاط")]
        public string Activity { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الإختصاص")]
        public string Speciality { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الصنف")]
        public string Category { get; set; }

        #endregion

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ الإعلان عن المنافسة")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateAnConc { get; set; }

        [Display(Name = "تاريخ إبرام الصفقة")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateDebu { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "آخر أجل لقبول العروض ")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateLastChanceAcceptTechnique { get; set; }

        [Display(Name = "تاريخ بداية الإنجاز")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateTraveau { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ و ساعة فتح العروض ")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateOpenAnTechnique { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "آجال الإنجاز")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string DelaiTraveau { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ تعهد لجنة  مراقية الصفقات بالملف ")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateProFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ ابداء رأي لجنة الصفقات ")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateAvisFinance { get; set; }



        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد ساحبي كراسات الشروط")]
        public int NbrChaier { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض")]
        public int NbrOffre { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض الملغات قبل الفرز المالي")]
        public int NbrSuppBeforeFinance { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "عدد العروض التي تم عرضها المالي")]
        public int NbrOffreFinance { get; set; }


        #region normal

        [Display(Name = "معايير المطابقة")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string Critere { get; set; }

        [Display(Name = "عدد العروض المطابقة")]
        public int NbrConform { get; set; }

        #endregion

        #region complex

        [Display(Name = "العدد الفني")]
        public int NbrTech { get; set; }

        [Display(Name = "العدد المالي")]
        public int NbrFinance { get; set; }

        [Display(Name = "معلومات حول تقييم العروض")]
        public Valeur Valeur { get; set; }

        [Display(Name = "المعايير المعتمدة للفرز الفني")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string CritereComplex { get; set; }

        [Display(Name = "الأهمية النسبية لكل معيار")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 2)]
        public string CritereImportance { get; set; }

        #endregion

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة الأسعار")]
        public NaturePrice NaturePrice { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "صيغة الأسعار")]
        public MethodPrice MethodPrice { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تقديرات المشتري العمومي")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        public decimal TotalEstimation { get; set; }

        #region estimation

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = " Lbl")]
        [StringLength(250, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public decimal Lbl { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "Montant ")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        public decimal Montant { get; set; }


        #endregion

        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string Description { get; set; }


        public void InitFromDoc(AchInDossier doc)
        {
            DossierID = doc.DossierID;
            Subject = doc.Dossier.Subject;
            AcheteurID = doc.AcheteurID;
            Type = doc.Dossier.Type;
            TotalLocal = doc.Dossier.TotalLocal;
            Financement = doc.Dossier.Financement;
        }

        public void InitFromFour(FournisseurDetail four)
        {
            FournisseurID = four.FournisseurID;
            Nationalite = four.Nationalite;
            Activity = four.Activity;
            Speciality = four.Speciality;
            Category = four.Category;

        }

    }

}