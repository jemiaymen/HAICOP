using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{
    public class AffectView
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        public int DossierID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "الموضوع")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 12)]
        public string Subject { get; set; }

        #region acheteur

        public int AcheteurDetailID { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "المشتري العمومي")]
        public int AcheteurID { get; set; }

        [Display(Name = "الهاتف")]
        [DataType(DataType.PhoneNumber)]
        public string Tel { get; set; }

        [Display(Name = "الفاكس")]
        [DataType(DataType.PhoneNumber)]
        public string Fax { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "إسم المسؤول و لقبه")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string FirstLastName { get; set; }

        [Display(Name = "العنوان الالكتروني")]
        [DataType(DataType.PhoneNumber)]
        public string Email { get; set; }

        #endregion

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "طبيعة الصفقة")]
        public DossierType Type { get; set; }



        public int DocDetailID { get; set; }

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
        public ModePassation Mode { get; set; }

        #region fournisseur
        public int FournisseurDetailID { get; set; }

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

        public int DossierDelaisID { get; set; }

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
        public DateTime DateLastChanceAccept { get; set; }

        [Display(Name = "تاريخ بداية الإنجاز")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateTraveau { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ و ساعة فتح العروض ")]
        [DataType(DataType.Date)]
        public DateTime DateOpen { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "آجال الإنجاز")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 3)]
        public string DelaiTraveau { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ تعهد لجنة  مراقية الصفقات بالملف ")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DatePro { get; set; }

        [Required(ErrorMessage = "اجباري")]
        [Display(Name = "تاريخ ابداء رأي لجنة الصفقات ")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateAvis { get; set; }


        public int ConcurrenceID { get; set; }


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


        public int MoinDisID { get; set; }


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

        public int InfoValeurID { get; set; }

        [Display(Name = "معلومات حول تقييم العروض")]
        public Valeur Valeur { get; set; }

        public int BalanceID { get; set; }
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

        [Display(Name = "ملاحظات")]
        [StringLength(500, ErrorMessage = "يجب أن يكون على الأقل {2} أحرف .", MinimumLength = 4)]
        public string Description { get; set; }


        public void InitFromDoc(Dossier doc)
        {

            DossierID = doc.ID;
            Subject = doc.Subject;
            Type = doc.Type;
            TotalLocal = doc.TotalLocal;
            Financement = doc.Financement;
            Mode = doc.Mode;
        }


        public void InitFromAffect(AffectTrend affect)
        {
            ID = affect.ID;
            Subject = affect.Subject;
            Financement = affect.Financement;
            TotalLocal = affect.TotalLocal;
        }

        public void InitFromFour(FournisseurDetail four)
        {
            FournisseurDetailID = four.ID;
            FournisseurID = four.FournisseurID;
            Nationalite = four.Nationalite;
            Activity = four.Activity;
            Speciality = four.Speciality;
            Category = four.Category;

        }

        public void InitFromAch(AcheteurDetail ach)
        {
            AcheteurDetailID = ach.ID;
            AcheteurID = ach.AcheteurID;
            Tel = ach.Tel;
            Fax = ach.Fax;
            Email = ach.Email;
            FirstLastName = ach.FirstLastName;
        }

        public void InitDocDelai(DossierDelais doc)
        {
            DossierDelaisID = doc.ID;
            DateAnConc = doc.DateAnConc;
            DateLastChanceAccept = doc.DateLastChanceAccept;
            DateOpen = doc.DateOpen;
            DatePro = doc.DatePro;
            DateAvis = doc.DateAvis;
            DateDebu = doc.DateDebu;
            DateTraveau = doc.DateTraveau;
            DelaiTraveau = doc.DelaiTraveau;
        }

        public void InitDocDetail(DossierDetail doc)
        {
            DocDetailID = doc.ID;
            IsSmall = doc.IsSmall;
            NbrLot = doc.NbrLot;

        }

        public void InitConcu(Concurrence con)
        {
            ConcurrenceID = con.ID;
            NbrChaier = con.NbrChaier;
            NbrOffre = con.NbrOffre;
            NbrSuppBeforeFinance = con.NbrSuppBeforeFinance;
            NbrOffreFinance = con.NbrOffreFinance;
        }

        public void InitInfo(InfoValeur info)
        {
            InfoValeurID = info.ID;
            Valeur = info.Valeur;
            NbrTech = info.NbrTech;
            NbrFinance = info.NbrFinance;
            NaturePrice = info.NaturePrice;
            MethodPrice = info.MethodPrice;
            TotalEstimation = info.TotalEstimation;
            Description = info.Description;
        }

        public void InitMoinDis(Moinsdis m)
        {
            MoinDisID = m.ID;
            Critere = m.Critere;
            NbrConform = m.NbrConform;
        }

        public void InitBalance(Balance b)
        {
            BalanceID = b.ID;
            CritereComplex = b.CritereComplex;
            CritereImportance = b.CritereImportance;
        }

        public void Init(AffectTrend affect)
        {
            InitFromDoc(affect.Dossier);
            InitFromAffect(affect);
            InitFromFour(affect.FournisseurDetail);
            InitFromAch(affect.AcheteurDetail);
            InitDocDelai(affect.DossierDelais);
            InitDocDetail(affect.DossierDetail);
            InitConcu(affect.Concurrence);
            InitInfo(affect.InfoValeur);
            InitMoinDis(affect.Moinsdis);
            InitBalance(affect.Balance);
        }

    }
}