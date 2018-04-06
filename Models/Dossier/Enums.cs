using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace HAICOP.Models
{

    public enum NatureAcheteur
    {
        [Display(Name = "الدولة")]
        Etat = 1,
        [Display(Name = "الجماعات المحلية")]
        CL = 2,
        [Display(Name = "المؤسسات العمومية + المؤسسات العمومية التي لا تكتسي صبغة إدارية")]
        EPEPNA = 3,
        [Display(Name = "المنشأت العمومية")]
        EPUB = 4
    }

    public enum Financement
    {
		[Display(Name = "التمويل ذاتي")]
        Local = 1,
		[Display(Name = "ميزانية")]
		Budget = 3,
		[Display(Name = "التمويل الأجنبي")]
		Foreign = 2
    }

    public enum ModePassation
    {
        [Display(Name = "صفقة إطارية")]
        AO = 1,
        [Display(Name = "التفاوض المباشر")]
        AR = 2,
        [Display(Name = "على مرحلتين")]
        A2 = 3,
        [Display(Name = "مناضرة")]
        AC = 4,
        [Display(Name = "صفقة إطارية مع طلب تمويل")]
        AOF = 5,
        [Display(Name = "طلب عروض مفتوح")]
        Open = 6,
        [Display(Name = "طلب عروض مضيق")]
        Close = 7,
        [Display(Name = "إستشارة")]
        Consultation = 8
    }

    public enum MailType 
	{
		[Display(Name = "الوارد")]
		Out = 2,
		[Display(Name = "الصادر")]
		In = 1
	}

    public enum MailNature
    {
        [Display(Name = "جديد")]
        New = 1,
        [Display(Name = "عناصر إجابة")]
        Rep = 2,
        [Display(Name = "وثائق تكميلية")]
        Compl = 3,
        [Display(Name = "الموافقة")]
        Accept = 4,
        [Display(Name = "إطلعت")]
        Vue = 5,
        [Display(Name = "موافاة")]
        Mouwafat = 6,
        [Display(Name = "إرجاء")]
        ReVue = 7,
        [Display(Name = "عدم الموافقة")]
        Refu = 8,
        [Display(Name = "عدم الإختصاص")]
        NotSpeciality = 9,
        [Display(Name = "الإجابة")]
        Repense = 10,
        [Display(Name = "إرجاع الملف")]
        SendBack = 11,
        [Display(Name = "عدم وجاهة")]
        RefuTwo = 12,
        [Display(Name = "يلغي ويعوض")]
        RefuAndChangement = 13,
        [Display(Name = "غير مثمر")]
        NonComform = 14,
        [Display(Name = "تذكير")]
        Rappel = 15,
        [Display(Name = "إعادة إعلان")]
        ReAnnonce = 16,
        [Display(Name = "إمضاء عقد")]
        Signature = 17,
        [Display(Name = "العدول عن النتائج")]
        Desacord = 18,
        [Display(Name = "إعادة دعوة إلى المنافسه")]
        Re = 19,
        [Display(Name = "عدم التعهد")]
        Not = 20
    }

    public enum DossierType 
	{
		[Display(Name = "أشغال")]
		Traveaux = 1,
		[Display(Name = "دراسات")]
		Etude = 2,
		[Display(Name = "تزود بمواد")]
		Matiere = 3,
		[Display(Name = "تزود بخدمات")]
		Service = 4
	}

	public enum DossierNature 
	{
		[Display(Name = "عريضة")]
		Petition = 1,
		[Display(Name = "إستشارة")]
		Consultation = 2,
		[Display(Name = "ملحق")]
		Avenant = 3,
		[Display(Name = "تقرير فرز العروض")]
		Rapport = 4,
		[Display(Name = "صفقة إطارية")]
		Affaire = 5,
		[Display(Name = "صفقة بالتفاوض المباشر")]
		AffaireDirect = 6,
		[Display(Name = "ختم نهائي")]
		Final = 7,
		[Display(Name = "قائمة الصفقات")]
		ListAffaire = 8,
		[Display(Name = "المخطط التقديري")]
		Prevu = 9,
		[Display(Name = "تكوين")]
		Formation = 10,
		[Display(Name = "موقع واب")]
		Web = 11,
		[Display(Name = "بطاقة تأليفية")]
		Carte = 12,
		[Display(Name = "نتيجة طلب العروض")]
		ResulatAffaire = 13,
		[Display(Name = "بطاقة بيانات")]
		CarteDeDonne = 14,
		[Display(Name = "معطيات تتعلق بالصفقات")]
		AffaireDonnee = 15,
		[Display(Name = "مراسلات مختلفة")]
		MessageDiver = 16,
		[Display(Name = "نشر إعلان")]
		Annonce = 17,
		[Display(Name = "تسجيل")]
		Enregistrement = 18,
		[Display(Name = "إجتماع")]
		Reunion = 19
	}

	public enum DossierState 
	{
		[Display(Name = "اظافة")]
		Creation = 1,
		[Display(Name = "جاري")]
		Encour = 2,
		[Display(Name = "استراحة")]
		Pause = 3,
		[Display(Name = "إنجاز")]
		Traitement = 4,
		[Display(Name = "القبول")]
		Accept = 5,
		[Display(Name = "الرفض")]
		Refus = 6
	}
	
}