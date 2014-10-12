'use strict';

// vim: ai:ts=4:sw=4:sts=4:et

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var addressSchema = new Schema({
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
});

var phoneSchema = new Schema({
    number: String, // Phone numbers can be weird. Store as string, not number.
    domesticity: {
        type: String,
        enum: [null, 'US', 'Intl']
    }
});

var countries = [
    { code: "US", full: "UNITED STATES" }
    , { code: "RQ", full: "PUERTO RICO - US Territory" }
    , { code: "AF", full: "AFGHANISTAN" }
    , { code: "AX", full: "AKROTIRI SOVEREIGN BASE AREA" }
    , { code: "AL", full: "ALBANIA" }
    , { code: "AG", full: "ALGERIA" }
    , { code: "AQ", full: "AMERICAN SAMOA" }
    , { code: "AN", full: "ANDORRA" }
    , { code: "AO", full: "ANGOLA" }
    , { code: "AV", full: "ANGUILLA" }
    , { code: "AY", full: "ANTARCTICA" }
    , { code: "AC", full: "ANTIGUA & BARBUDA" }
    , { code: "AR", full: "ARGENTINA" }
    , { code: "AM", full: "ARMENIA" }
    , { code: "AA", full: "ARUBA" }
    , { code: "AT", full: "ASHMORE & CARTIER ISLANDS" }
    , { code: "AS", full: "AUSTRALIA" }
    , { code: "AU", full: "AUSTRIA" }
    , { code: "AJ", full: "AZERBAIJAN" }
    , { code: "BF", full: "BAHAMAS" }
    , { code: "BA", full: "BAHRAIN" }
    , { code: "FQ", full: "BAKER ISLAND" }
    , { code: "BG", full: "BANGLADESH" }
    , { code: "BB", full: "BARBADOS" }
    , { code: "BS", full: "BASSAS DA INDIA" }
    , { code: "BO", full: "BELARUS" }
    , { code: "BE", full: "BELGIUM" }
    , { code: "BH", full: "BELIZE" }
    , { code: "BN", full: "BENIN" }
    , { code: "BD", full: "BERMUDA" }
    , { code: "BT", full: "BHUTAN" }
    , { code: "BL", full: "BOLIVIA" }
    , { code: "BK", full: "BOSNIA - HERZEGOVINA" }
    , { code: "BC", full: "BOTSWANA" }
    , { code: "BV", full: "BOUVET ISLAND" }
    , { code: "BR", full: "BRAZIL" }
    , { code: "IO", full: "BRITISH INDIAN OCEAN TERR" }
    , { code: "BP", full: "BRITISH SOLOMON ISLANDS" }
    , { code: "VI", full: "BRITISH VIRGIN ISLANDS" }
    , { code: "BX", full: "BRUNEI" }
    , { code: "BU", full: "BULGARIA" }
    , { code: "UV", full: "BURKINA FASO" }
    , { code: "BM", full: "BURMA" }
    , { code: "BY", full: "BURUNDI" }
    , { code: "CB", full: "CAMBODIA" }
    , { code: "CM", full: "CAMEROON" }
    , { code: "CA", full: "CANADA" }
    , { code: "CV", full: "CAPE VERDE" }
    , { code: "CJ", full: "CAYMAN ISLANDS" }
    , { code: "CT", full: "CENTRAL AFRICAN REPUBLIC" }
    , { code: "CD", full: "CHAD" }
    , { code: "CI", full: "CHILE" }
    , { code: "CH", full: "CHINA, PEOPLES REPUBLIC OF" }
    , { code: "KT", full: "CHRISTMAS ISLAND" }
    , { code: "IP", full: "CLIPPERTON ISLAND" }
    , { code: "CK", full: "COCOS (KEELING) ISLANDS" }
    , { code: "CO", full: "COLOMBIA" }
    , { code: "CN", full: "COMOROS" }
    , { code: "CG", full: "CONGO (DEMOCRATIC REPUBLIC OF)" }
    , { code: "CF", full: "CONGO (REPUBLIC OF THE)" }
    , { code: "CW", full: "COOK ISLANDS" }
    , { code: "CR", full: "CORAL SEA ISLANDS TERRITORY" }
    , { code: "CS", full: "COSTA RICA" }
    , { code: "HR", full: "CROATIA" }
    , { code: "CU", full: "CUBA" }
    , { code: "CY", full: "CYPRUS" }
    , { code: "EZ", full: "CZECH REPUBLIC" }
    , { code: "DA", full: "DENMARK" }
    , { code: "DX", full: "DHEKELIA SOVEREIGN BASE AREA" }
    , { code: "DJ", full: "DJIBOUTI" }
    , { code: "DO", full: "DOMINICA" }
    , { code: "DR", full: "DOMINICAN REPUBLIC" }
    , { code: "EC", full: "ECUADOR" }
    , { code: "EG", full: "EGYPT" }
    , { code: "ES", full: "EL SALVADOR" }
    , { code: "EK", full: "EQUATORIAL GUINEA" }
    , { code: "ER", full: "ERITREA" }
    , { code: "EN", full: "ESTONIA" }
    , { code: "ET", full: "ETHIOPIA" }
    , { code: "PJ", full: "ETOROFU,HABOMAI,KUNASHIRI,SHIK" }
    , { code: "EU", full: "EUROPA ISLAND" }
    , { code: "FO", full: "FAEROE ISLANDS" }
    , { code: "FK", full: "FALKLAND ISLANDS" }
    , { code: "FJ", full: "FIJI" }
    , { code: "FI", full: "FINLAND" }
    , { code: "FS", full: "FR SOUTHERN & ANTARCTIC LANDS" }
    , { code: "FR", full: "FRANCE" }
    , { code: "FG", full: "FRENCH GUIANA" }
    , { code: "FP", full: "FRENCH POLYNESIA" }
    , { code: "GB", full: "GABON" }
    , { code: "GA", full: "GAMBIA" }
    , { code: "GZ", full: "GAZA STRIP" }
    , { code: "GG", full: "GEORGIA" }
    , { code: "GM", full: "GERMANY" }
    , { code: "GH", full: "GHANA" }
    , { code: "GI", full: "GIBRALTAR" }
    , { code: "GO", full: "GLORIOSO ISLANDS" }
    , { code: "GR", full: "GREECE" }
    , { code: "GL", full: "GREENLAND" }
    , { code: "GJ", full: "GRENADA" }
    , { code: "GP", full: "GUADELOUPE" }
    , { code: "GQ", full: "GUAM" }
    , { code: "GT", full: "GUATEMALA" }
    , { code: "GK", full: "GUERNSEY" }
    , { code: "GV", full: "GUINEA" }
    , { code: "PU", full: "GUINEA-BISSAU" }
    , { code: "GY", full: "GUYANA" }
    , { code: "HA", full: "HAITI" }
    , { code: "HM", full: "HEARD ISLAND & MCDONALD ISLAN" }
    , { code: "VT", full: "HOLY SEE(VATICAN CITY)" }
    , { code: "HO", full: "HONDURAS" }
    , { code: "HK", full: "HONG KONG" }
    , { code: "HQ", full: "HOWLAND ISLAND" }
    , { code: "HU", full: "HUNGARY" }
    , { code: "IC", full: "ICELAND" }
    , { code: "IN", full: "INDIA" }
    , { code: "ID", full: "INDONESIA" }
    , { code: "IR", full: "IRAN" }
    , { code: "IZ", full: "IRAQ" }
    , { code: "EI", full: "IRELAND" }
    , { code: "IS", full: "ISRAEL" }
    , { code: "IT", full: "ITALY" }
    , { code: "IV", full: "IVORY COAST(COTE D'IVOIRE)" }
    , { code: "JM", full: "JAMAICA" }
    , { code: "JN", full: "JAN MAYEN" }
    , { code: "JA", full: "JAPAN" }
    , { code: "DQ", full: "JARVIS ISLAND" }
    , { code: "JE", full: "JERSEY" }
    , { code: "JQ", full: "JOHNSTON ATOLL" }
    , { code: "JO", full: "JORDAN" }
    , { code: "JU", full: "JUAN DE NOVA ISLAND" }
    , { code: "KZ", full: "KAZAKHSTAN" }
    , { code: "KE", full: "KENYA" }
    , { code: "KQ", full: "KINGMAN REEF" }
    , { code: "KR", full: "KIRIBATI" }
    , { code: "KN", full: "KOREA, NORTH" }
    , { code: "KS", full: "KOREA, SOUTH" }
    , { code: "KV", full: "KOSOVO" }
    , { code: "KU", full: "KUWAIT" }
    , { code: "KG", full: "KYRGYZSTAN" }
    , { code: "LA", full: "LAOS" }
    , { code: "LG", full: "LATVIA" }
    , { code: "LE", full: "LEBANON" }
    , { code: "LT", full: "LESOTHO" }
    , { code: "LI", full: "LIBERIA" }
    , { code: "LY", full: "LIBYA" }
    , { code: "LS", full: "LIECHTENSTEIN" }
    , { code: "LH", full: "LITHUANIA" }
    , { code: "LU", full: "LUXEMBOURG" }
    , { code: "MC", full: "MACAU" }
    , { code: "MK", full: "MACEDONIA" }
    , { code: "MA", full: "MADAGASCAR" }
    , { code: "MI", full: "MALAWI" }
    , { code: "MY", full: "MALAYSIA" }
    , { code: "MV", full: "MALDIVES" }
    , { code: "ML", full: "MALI" }
    , { code: "MT", full: "MALTA" }
    , { code: "IM", full: "MAN, ISLE OF" }
    , { code: "RM", full: "MARSHALL ISLANDS" }
    , { code: "MB", full: "MARTINIQUE" }
    , { code: "MR", full: "MAURITANIA" }
    , { code: "MP", full: "MAURITIUS" }
    , { code: "MF", full: "MAYOTTE" }
    , { code: "MX", full: "MEXICO" }
    , { code: "FM", full: "MICRONESIA, FEDERATED STATES" }
    , { code: "MQ", full: "MIDWAY ISLANDS" }
    , { code: "MD", full: "MOLDOVA" }
    , { code: "MN", full: "MONACO" }
    , { code: "MG", full: "MONGOLIA" }
    , { code: "MJ", full: "MONTENEGRO" }
    , { code: "MH", full: "MONTSERRAT" }
    , { code: "MO", full: "MOROCCO" }
    , { code: "MZ", full: "MOZAMBIQUE" }
    , { code: "WA", full: "NAMIBIA" }
    , { code: "NR", full: "NAURU" }
    , { code: "BQ", full: "NAVASSA ISLAND" }
    , { code: "NP", full: "NEPAL" }
    , { code: "NL", full: "NETHERLANDS" }
    , { code: "NT", full: "NETHERLANDS ANTILLES" }
    , { code: "NC", full: "NEW CALEDONIA" }
    , { code: "NZ", full: "NEW ZEALAND" }
    , { code: "NU", full: "NICARAGUA" }
    , { code: "NG", full: "NIGER" }
    , { code: "NI", full: "NIGERIA" }
    , { code: "NE", full: "NIUE" }
    , { code: "NF", full: "NORFOLK ISLAND" }
    , { code: "CQ", full: "NORTHERN MARIANA ISLANDS" }
    , { code: "NO", full: "NORWAY" }
    , { code: "MU", full: "OMAN" }
    , { code: "PK", full: "PAKISTAN" }
    , { code: "PS", full: "PALAU" }
    , { code: "LQ", full: "PALMYRA ATOLL" }
    , { code: "PM", full: "PANAMA" }
    , { code: "PP", full: "PAPUA NEW GUINEA" }
    , { code: "PF", full: "PARACEL ISLANDS" }
    , { code: "PA", full: "PARAGUAY" }
    , { code: "PE", full: "PERU" }
    , { code: "RP", full: "PHILIPPINES" }
    , { code: "PC", full: "PITCAIRN ISLAND" }
    , { code: "PL", full: "POLAND" }
    , { code: "PO", full: "PORTUGAL" }
    , { code: "QA", full: "QATAR" }
    , { code: "RE", full: "REUNION" }
    , { code: "RO", full: "ROMANIA" }
    , { code: "RS", full: "RUSSIA" }
    , { code: "RW", full: "RWANDA" }
    , { code: "TB", full: "SAINT BARTHELEMY(FRANCE)" }
    , { code: "RN", full: "SAINT MARTIN(FRANCE)" }
    , { code: "SM", full: "SAN MARINO" }
    , { code: "TP", full: "SAN TOME & PRINCIPE" }
    , { code: "SA", full: "SAUDI ARABIA" }
    , { code: "SG", full: "SENEGAL" }
    , { code: "RI", full: "SERBIA" }
    , { code: "SE", full: "SEYCHELLES" }
    , { code: "SL", full: "SIERRA LEONE" }
    , { code: "SN", full: "SINGAPORE" }
    , { code: "LO", full: "SLOVAKIA" }
    , { code: "SI", full: "SLOVENIA" }
    , { code: "SO", full: "SOMALIA" }
    , { code: "SF", full: "SOUTH AFRICA" }
    , { code: "SX", full: "SOUTH GEORGIA & SANDWICH IS" }
    , { code: "SP", full: "SPAIN" }
    , { code: "PG", full: "SPRATLY ISLANDS" }
    , { code: "CE", full: "SRI LANKA" }
    , { code: "SC", full: "ST KITTS AND NEVIS" }
    , { code: "SH", full: "ST. HELENA" }
    , { code: "ST", full: "ST. LUCIA" }
    , { code: "SB", full: "ST. PIERRE & MIQUELON" }
    , { code: "VC", full: "ST. VINCENT & GRENADINES" }
    , { code: "SU", full: "SUDAN" }
    , { code: "NS", full: "SURINAME" }
    , { code: "SV", full: "SVALBARD" }
    , { code: "WZ", full: "SWAZILAND" }
    , { code: "SW", full: "SWEDEN" }
    , { code: "SZ", full: "SWITZERLAND" }
    , { code: "SY", full: "SYRIA" }
    , { code: "TW", full: "TAIWAN" }
    , { code: "TI", full: "TAJIKSTAN" }
    , { code: "TZ", full: "TANZANIA" }
    , { code: "TH", full: "THAILAND" }
    , { code: "TT", full: "TIMOR-LESTE" }
    , { code: "TO", full: "TOGO" }
    , { code: "TL", full: "TOKELAU ISLANDS" }
    , { code: "TN", full: "TONGA" }
    , { code: "TD", full: "TRINIDAD & TOBAGO" }
    , { code: "TE", full: "TROMELIN ISLAND" }
    , { code: "TS", full: "TUNISIA" }
    , { code: "TU", full: "TURKEY" }
    , { code: "TX", full: "TURKMENISTAN" }
    , { code: "TK", full: "TURKS & CAICOS ISLANDS" }
    , { code: "TV", full: "TUVALU" }
    , { code: "UG", full: "UGANDA" }
    , { code: "UP", full: "UKRAINE" }
    , { code: "AE", full: "UNITED ARAB EMIRATES" }
    , { code: "UK", full: "UNITED KINGDOM" }
    , { code: "ZZ", full: "UNKNOWN" }
    , { code: "UY", full: "URUGUAY" }
    , { code: "UZ", full: "UZBEKISTAN" }
    , { code: "NH", full: "VANUATU" }
    , { code: "VE", full: "VENEZUELA" }
    , { code: "VM", full: "VIETNAM" }
    , { code: "VQ", full: "VIRGIN ISLANDS" }
    , { code: "WQ", full: "WAKE ISLAND" }
    , { code: "WF", full: "WALLIS & FUTUNA" }
    , { code: "WE", full: "WEST BANK" }
    , { code: "WI", full: "WESTERN SAHARA" }
    , { code: "WS", full: "WESTERN SAMOA" }
    , { code: "YM", full: "YEMEN" }
    , { code: "ZA", full: "ZAMBIA" }
    , { code: "ZI", full: "ZIMBABWE" }
];

var countryCodes = [null];
for (var i = 0; i < countries.length; i++) {
    countryCodes.push(countries[i].code);
}

/**
 * GradApplication Schema
 */
var GradApplicationSchema = new Schema({

    /**
     * Old application
     */
    name: {
        type: String,
        default: null,
        required: "Please fill in the applicant's name",
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    /**
     * New Application
     */

    personal_info: {
        name: {
            first: String,
            middle: String,
            last: String,
            suffix: {
                type: String,
                default: null,
                enum: [
                    'Jr.',
                    'Sr.',
                    'II',
                    'III',
                    'IV',
                    'V'
                ]
            },
            other_names: String
        },
        does_not_have_SSN: Boolean,
        SSN: {
            // TODO Do we really need to store this?
            //  if all we need to use it for is ID verification, then
            //  a hash of it (plus a large salt) should be sufficient.
            type: String,
            // Do not store SSN as number. It's effectively a string
            // because no math is done with an SSN and it always needs
            // to be displayed with a certain number of digits.
            //
            // If we do store SSNs, they should be encrypted using a key
            // not stored in the database.
        },
        UFID: {
            type: String,
            default: ''
        },
        previous_application: {
            type: Boolean,
            default: null
        },
        previous_attendance: {
            type: Boolean,
            default: null
        },
        dob: Date,
        gender: {
            type: String,
            default: '',
            enum: ['M', 'F']
        },
        nation_of_citizenship: {
            type: String,
            default: '',
            enum: countryCodes
        },
        ethnicity: {
            hispanic: Boolean,
            specifics: {
                'amer_indian_or_alaska': Boolean, // American Indian or Alaska Native
                'asian': Boolean, // Asian
                'black_african_amer': Boolean, // Black/African American
                'hawaii_or_pacific': Boolean, // Hawaii Native or Other Pacific Islander
                'white': Boolean // White
            }
        },
        email: String,
        phone: {
            personal: phoneSchema,
            work: {
                number: {
                    type: Number,
                },
                us: {
                    type: Boolean,
                    default: false
                },
            },
            cell: {
                number: {
                    type: Number
                },
                us: {
                    type: Boolean,
                    default: false
                },
            }
        },
        address: {
            permanent: addressSchema,
            current: addressSchema,
            valid_until: Date
        },
        emergency_contact: {
            name: {
                first: String,
                middle: String,
                last: String,
                suffix: String,
                other_names: [String],
                relationship: String
            },
            address: addressSchema,
            phone: {
                personal: {
                    number: Number,
                    us: {
                        type: Boolean,
                        default: false
                    },
                    intl: {
                        type: Boolean,
                        default: false
                    },
                },
                work: {
                    number: Number,
                    us: {
                        type: Boolean,
                        default: false
                    },
                    intl: {
                        type: Boolean,
                        default: false
                    }
                },
                cell: {
                    number: Number,
                    us: {
                        type: Boolean,
                        default: false
                    },
                    intl: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        },
        veteran_status: {
            active_veteran_: Boolean,
            post_sep11: Boolean,
            eligible_va_benefits: Boolean
        },
        conduct_disclosure: {
            charged_or_disciplined: Boolean,
            charged_law_violation: Boolean
        }
    },

    special_programs_info: {
        special_programs_application: {
            famu_feeder: {
                type: String,
                default: ''
            },
            fullbright_scholar: {
                type: String,
                default: ''
            },
            please_identify_program: {
                type: String,
                default: ''
            },
            mcnair_scholar: {
                type: String,
                default: ''
            },
            mcknight_scholar: {
                type: String,
                default: ''
            },
            national_science_foundation_fellowship: {
                type: String,
                default: ''
            },
            national_institutes_of_health_fellowship: {
                type: String,
                default: ''
            },
            other: {
                scholarship: {
                    type: String,
                    default: ''
                },
                explain: {
                    type: String,
                    default: ''
                }
            },
            check_following: {
                assistantship: {
                    type: Boolean,
                    default: false
                },
                distance_learning: {
                    type: Boolean,
                    default: false
                },
                fellowship: {
                    type: Boolean,
                    default: false
                },
                joint_UF_degree: {
                    type: Boolean,
                    default: false
                },
                three_two_program: {
                    type: Boolean,
                    default: false
                }
            } /* check if you are the following?? */
        },
        supporting_documentation: { /* TBD upload files */
            name: String,
            file: Buffer
        }
    },
    degree_programs: {
        primary_program: {
            intended_year_and_term: String,
            degree_goal: String,
            program_of_study: String,
            program_specialization: String,
            department_contact: String
        },
        statement_of_purpose: String
    },
    education_and_activities: {
        undergraduate: {
            major: {
                type: String,
                default: ''
            },
            specialization: {
                type: String,
                default: ''
            }
        },
        colleges: [String],
        /* opening another link*/
        self_reported_GPA: {
            type: String,
            enum: [
                'A',
                'A-',
                'B+',
                'B',
                'B-',
                'C+',
                'C',
                'C-',
                'D+',
                'D',
                'D-',
                'F'
            ],
        },
        test_scores: {

            // Graduate Record Examinations
            GRE: {
                type: Boolean,
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                total: Number
            },

            // Graduate Management Admission Test
            GMAT: {
                type: Boolean,
                date: Date,
                verbal: Number,
                quantitative: Number,
                analytical_writing: Number,
                integrated_reasoning: Number,
                total: Number
            },

            // Miller Analogies Test
            MAT: {
                type: Boolean,
                date: Date,
                score: String /* String? */
            },

            // Fundamentals of Engineering
            FE: {
                type: Boolean,
                date: Date,
                score: String /* String? */
            },

            // Test of Spoken English
            TSE: {
                type: Number
                // TODO
            },

            // Test of English as a Foreign Language
            TOEFL: {
                type: Boolean,
                paper_date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                total: Number,
                internet_date: Date,
                readingi: Number,
                listeningi: Number,
                speakingi: Number,
                writingi: Number,
                totali: Number
            },

            // International English Language Testing System
            IELTS: {
                type: Boolean,
                date: Date,
                listening: Number,
                writing: Number,
                reading: Number,
                speaking: Number,
                total: Number
            },

            // Michigan English Language Assessment Battery
            MELAB: {
                type: Boolean,
                date: Date,
                composition: Number,
                listening: Number,
                gcvr: Number,
                total: Number
            },
            uf_lang_institute_program: Boolean
        },
        activities: {
            activity: {
                type: String,
                default: ''
            },
            city: String,
            country: String,
            state: String,
            from: String,
            day1: String,
            to: String,
            day2: String
        },
        resume: {
            name: String,
            file: Buffer
        },
        transcript: {
            name: String,
            file: Buffer
        }
    },
    residency_affadivit: {
        florida_residence_categories: {
            A: {
                type: Boolean,
                default: false
            },
            B: {
                type: Boolean,
                default: false
            },
            C: {
                type: Boolean,
                default: false
            },
            D: {
                type: Boolean,
                default: false
            },
            E: {
                type: Boolean,
                default: false
            },
            F: {
                type: Boolean,
                default: false
            },
            G: {
                type: Boolean,
                default: false
            },
            H: {
                type: Boolean,
                default: false
            },
            I: {
                type: Boolean,
                default: false
            },
            J: {
                type: Boolean,
                default: false
            },
            K: {
                type: Boolean,
                default: false
            },
            L: {
                type: Boolean,
                default: false
            },
            M: {
                type: Boolean,
                default: false
            },
            N: {
                type: Boolean,
                default: false
            },
            O: {
                type: Boolean,
                default: false
            },
            P: {
                type: Boolean,
                default: false
            },
            Q: {
                type: Boolean,
                default: false
            },
            R: {
                type: Boolean,
                default: false
            },
            S: {
                type: Boolean,
                default: false
            }
        }
    }

});

mongoose.model('GradApplication', GradApplicationSchema);
