import mongoose from 'mongoose';

const referralInformationSchema = new mongoose.Schema({
  referredBy: String,
  reasonForReferral: String
});

const contactInformationSchema = new mongoose.Schema({
  address: String,
  phoneNumber: String,
  email: String
});

const emergencyContactSchema = new mongoose.Schema({
  fullName: String,
  relationship: String,
  phoneNumber: String
});

const substanceUseHistorySchema = new mongoose.Schema({
  primarySubstanceOfUse: {
    substance: String,
    ageOfFirstUse: Number,
    frequencyOfUse: String,
    amountUsed: String,
    routeOfAdministration: String
  },
  secondarySubstanceOfUse: {
    substance: String,
    ageOfFirstUse: Number,
    frequencyOfUse: String,
    amountUsed: String,
    routeOfAdministration: String
  },
  otherSubstancesUsed: {
    substance: String,
    ageOfFirstUse: Number,
    frequencyOfUse: String,
    amountUsed: String,
    routeOfAdministration: String
  },
  previousTreatment: {
    treatmentProgram: String,
    datesOfTreatment: String,
    outcomes: String
  }
});

const patternsOfUseSchema = new mongoose.Schema({
  situationsTriggers: String,
  timesOfUse: String,
  methodsOfUse: String,
  periodsOfAbstinence: String
});

const consequencesOfUseSchema = new mongoose.Schema({
  physicalHealthImpact: String,
  mentalHealthImpact: String,
  socialImpact: String,
  occupationalEducationalImpact: String,
  legalIssuesRelatedToUse: String
});

const assessmentOfDependenceSchema = new mongoose.Schema({
  tolerance: String,
  withdrawalSymptoms: String,
  lossOfControl: String,
  timeSpent: String,
  reductionInActivities: String,
  continuedUseDespiteProblems: String
});

const mentalHealthHistorySchema = new mongoose.Schema({
  currentDiagnoses: String,
  pastDiagnoses: String,
  currentMedications: String,
  pastHospitalizations: String,
  currentTherapeuticInterventions: String
});

const familyHistoryOfSubstanceUseSchema = new mongoose.Schema({
  familyMembersWithIssues: String,
  impactOnClient: String
});

const socialHistorySchema = new mongoose.Schema({
  livingSituation: String,
  supportSystem: String,
  employmentEducationStatus: String,
  legalHistory: String,
  financialSituation: String
});

const readinessForChangeSchema = new mongoose.Schema({
  perceptionOfProblem: String,
  motivationForChange: String,
  goalsForTreatment: String,
  barriersToTreatment: String
});

const treatmentPlanSchema = new mongoose.Schema({
  recommendedLevelOfCare: String,
  specificInterventions: String,
  referralToServices: String,
  followUpPlan: String
});

const riskAssessmentSchema = new mongoose.Schema({
  suicidalIdeation: String,
  homicidalIdeation: String,
  selfHarmBehaviors: String,
  riskToOthers: String
});

const clientStrengthsAndResourcesSchema = new mongoose.Schema({
  personalStrengths: String,
  availableResources: String
});

const assessorInformationSchema = new mongoose.Schema({
  assessorName: String,
  assessorSignature: String,
  date: Date
});

const soapSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  dateOfAssessment: Date,
  referralInformation: referralInformationSchema,
  contactInformation: contactInformationSchema,
  emergencyContact: emergencyContactSchema,
  substanceUseHistory: substanceUseHistorySchema,
  patternsOfUse: patternsOfUseSchema,
  consequencesOfUse: consequencesOfUseSchema,
  assessmentOfDependence: assessmentOfDependenceSchema,
  mentalHealthHistory: mentalHealthHistorySchema,
  familyHistoryOfSubstanceUse: familyHistoryOfSubstanceUseSchema,
  socialHistory: socialHistorySchema,
  readinessForChange: readinessForChangeSchema,
  treatmentPlan: treatmentPlanSchema,
  riskAssessment: riskAssessmentSchema,
  clientStrengthsAndResources: clientStrengthsAndResourcesSchema,
  assessorInformation: assessorInformationSchema,
  document: String  
});

const Soap = mongoose.model('Soap', soapSchema);

export default Soap;
