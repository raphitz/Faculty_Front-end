'use strict';

// vim: ai:ts=4:sw=4:sts=4:et

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    countryCodes = require('../../public/config.js').ApplicationConfiguration.countryCodes;

var _phoneBase = {
    number: {
        type: String
    }, // Phone numbers can be weird. Store as string, not number.
    domesticity: {
        type: String,
        enum: [null, 'US', 'Intl']
    }
};

var phoneSchema = new Schema(_phoneBase);

var phonePlusExtensionSchema = new Schema(_phoneBase);
phonePlusExtensionSchema.add({
    extension: String
});



var addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    country: {
        type: String,
        enum: countryCodes
    },
    zip: String
});


/**
 * GradApplication Schema
 */
var GradApplicationSchema = new Schema({

    /**
     * Old application
     */
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
                default: '',
                enum: [
                    '',
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
            default: '',
            match: /^(\d{4}-\d{4})?$/,
            unique: true
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
            default: '?',
            enum: ['?', 'M', 'F']
        },
        nation_of_citizenship: {
            type: String,
            default: '?',
            enum: ['?'].concat(countryCodes)
        },
        ethnicity: [{
            hispanic: Boolean,
            specifics: {
                'amer_indian_or_alaska': Boolean, // American Indian or Alaska Native
                'asian': Boolean, // Asian
                'black_african_amer': Boolean, // Black/African American
                'hawaii_or_pacific': Boolean, // Hawaii Native or Other Pacific Islander
                'white': Boolean // White
            }
        }],
        email: String,
        phone: [{
            personal: [phoneSchema],
            cell: [phoneSchema],
            work: [phonePlusExtensionSchema]
        }],
        address: [{
            permanent: [addressSchema],
            current: [addressSchema], // TODO use subclass of addressSchema that has 3 addr lines?
            current_valid_until: Date
        }],
        emergency_contact: [{
            name: {
                first: String,
                last: String,
            },
            relationship: {
                type: String,
                enum: [
                    'MO', // Mother
                    'FA', // Father
                    'WI', // Wife
                    'HU', // Husband
                    'LG', // Legal Guardian
                    'OT' // Other
                ]
            },
            address: [addressSchema], // TODO use subclass of addressSchema that has 3 addr lines?
            phone: [{
                personal: [phoneSchema],
                cell: [phoneSchema],
                work: [phonePlusExtensionSchema]
            }]
        }],
        military_status: [{
            member_or_vet: {
                type: String,
                enum: ['yes_active', 'yes_veteran', 'no']
            },
            post_sep11: Boolean,
            eligible_va_benefits: Boolean
        }],
        conduct_disclosure: [{
            charged_or_disciplined: Boolean,
            charged_law_violation: Boolean
        }]
    },

    // special_programs_info: {
    //     special_programs_application: {
    //         famu_feeder: {
    //             type: String,
    //             default: ''
    //         },
    //         fullbright_scholar: {
    //             type: String,
    //             default: ''
    //         },
    //         please_identify_program: {
    //             type: String,
    //             default: ''
    //         },
    //         mcnair_scholar: {
    //             type: String,
    //             default: ''
    //         },
    //         mcknight_scholar: {
    //             type: String,
    //             default: ''
    //         },
    //         national_science_foundation_fellowship: {
    //             type: String,
    //             default: ''
    //         },
    //         national_institutes_of_health_fellowship: {
    //             type: String,
    //             default: ''
    //         },
    //         other: {
    //             scholarship: {
    //                 type: String,
    //                 default: ''
    //             },
    //             explain: {
    //                 type: String,
    //                 default: ''
    //             }
    //         },
    //         check_following: {
    //             assistantship: {
    //                 type: Boolean,
    //                 default: false
    //             },
    //             distance_learning: {
    //                 type: Boolean,
    //                 default: false
    //             },
    //             fellowship: {
    //                 type: Boolean,
    //                 default: false
    //             },
    //             joint_UF_degree: {
    //                 type: Boolean,
    //                 default: false
    //             },
    //             three_two_program: {
    //                 type: Boolean,
    //                 default: false
    //             }
    //         } /* check if you are the following?? */
    //     },
    //     supporting_documentation: { /* TBD upload files */
    //         name: String,
    //         file: Buffer
    //     }
    // },
    // degree_programs: {
    //     primary_program: {
    //         intended_year_and_term: String,
    //         degree_goal: String,
    //         program_of_study: String,
    //         program_specialization: String,
    //         department_contact: String
    //     },
    //     statement_of_purpose: String
    // },
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
        colleges: [String], // TODO database of universities
        /* opening another link*/
        self_reported_GPA: Number,
        // TODO verify all below fields match actual app
        test_scores: {

            // Graduate Record Examinations
            GRE: Number,
            //GRE: {
            //    type: Boolean,
            //    date: Date,
            //    verbal: Number,
            //    quantitative: Number,
            //    analytical_writing: Number,
            //    total: Number
            //},

            // Graduate Management Admission Test
            GMAT: Number,
            //GMAT: {
            //    type: Boolean,
            //    date: Date,
            //    verbal: Number,
            //    quantitative: Number,
            //    analytical_writing: Number,
            //    integrated_reasoning: Number,
            //    total: Number
            //},

            // Miller Analogies Test
            MAT: Number,
            //MAT: {
            //    type: Boolean,
            //    date: Date,
            //    score: String /* String? */
            //},

            // Fundamentals of Engineering
            FE: Number,
            //FE: {
            //    type: Boolean,
            //    date: Date,
            //    score: String /* String? */
            //},

            // Test of Spoken English
            TSE: {
                type: Number
                    // TODO
            },

            // Test of English as a Foreign Language
            TOEFL: Number,
            //TOEFL: {
            //    type: Boolean,
            //    paper_date: Date,
            //    listening: Number,
            //    writing: Number,
            //    reading: Number,
            //    total: Number,
            //    internet_date: Date,
            //    readingi: Number,
            //    listeningi: Number,
            //    speakingi: Number,
            //    writingi: Number,
            //    totali: Number
            //},

            // International English Language Testing System
            IELTS: Number,
            //IELTS: {
            //    type: Boolean,
            //    date: Date,
            //    listening: Number,
            //    writing: Number,
            //    reading: Number,
            //    speaking: Number,
            //    total: Number
            //},

            // Michigan English Language Assessment Battery
            MELAB: Number,
            //MELAB: {
            //    type: Boolean,
            //    date: Date,
            //    composition: Number,
            //    listening: Number,
            //    gcvr: Number,
            //    total: Number
            //},

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
    // residency_affadivit: {
    //     florida_residence_categories: {
    //         A: {
    //             type: Boolean,
    //             default: false
    //         },
    //         B: {
    //             type: Boolean,
    //             default: false
    //         },
    //         C: {
    //             type: Boolean,
    //             default: false
    //         },
    //         D: {
    //             type: Boolean,
    //             default: false
    //         },
    //         E: {
    //             type: Boolean,
    //             default: false
    //         },
    //         F: {
    //             type: Boolean,
    //             default: false
    //         },
    //         G: {
    //             type: Boolean,
    //             default: false
    //         },
    //         H: {
    //             type: Boolean,
    //             default: false
    //         },
    //         I: {
    //             type: Boolean,
    //             default: false
    //         },
    //         J: {
    //             type: Boolean,
    //             default: false
    //         },
    //         K: {
    //             type: Boolean,
    //             default: false
    //         },
    //         L: {
    //             type: Boolean,
    //             default: false
    //         },
    //         M: {
    //             type: Boolean,
    //             default: false
    //         },
    //         N: {
    //             type: Boolean,
    //             default: false
    //         },
    //         O: {
    //             type: Boolean,
    //             default: false
    //         },
    //         P: {
    //             type: Boolean,
    //             default: false
    //         },
    //         Q: {
    //             type: Boolean,
    //             default: false
    //         },
    //         R: {
    //             type: Boolean,
    //             default: false
    //         },
    //         S: {
    //             type: Boolean,
    //             default: false
    //         }
    //     }
    // }

});

mongoose.model('GradApplication', GradApplicationSchema);
