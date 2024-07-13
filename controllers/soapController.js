import Soap from '../models/soapSchema.js';
// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
import mammoth from 'mammoth';
import textract from 'textract';


export const getSoaps = async (req, res) => {
  try {
    const soaps = await Soap.find();
    res.json(soaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSoapById = async (req, res) => {
  try {
    const soap = await Soap.findById(req.params.id);
    if (soap == null) {
      return res.status(404).json({ message: 'SOAP entry not found' });
    }
    res.json(soap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const extractTextFromFile = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: 'File content not provided' });
    }

    const fileBuffer = req.file.buffer;
    const fileType = req.file.originalname.split('.').pop();
console.log("fileType>>>",fileType);
    let fileContent;

    if (fileType === 'txt') {
      fileContent = fileBuffer.toString('utf8');
    } else if (fileType === 'docx') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      fileContent = result.value;
    } else if (fileType === 'doc') {
      fileContent = await new Promise((resolve, reject) => {
        textract.fromBufferWithMime('application/msword', fileBuffer, (err, text) => {
          if (err) {
            return reject(err);
          }
          resolve(text);
        });
      });
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    res.json({ fileContent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const createSoap = async (req, res) => {
  const soapData = req.body;

  try {
    const newSoap = new Soap(soapData);
    const savedSoap = await newSoap.save();

    res.status(201).json({ message: 'Soap data created successfully', savedSoap  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSoap = async (req, res) => {
  try {
    const soap = await Soap.findById(req.params.id);
    if (soap == null) {
      return res.status(404).json({ message: 'SOAP entry not found' });
    }
    Object.assign(soap, req.body);
    const updatedSoap = await soap.save();
    res.json(updatedSoap);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteSoap = async (req, res) => {
  try {
    const soap = await Soap.findById(req.params.id);
    if (soap == null) {
      return res.status(404).json({ message: 'SOAP entry not found' });
    }
    await soap.deleteOne();
    res.json({ message: 'SOAP entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 // Regular expressions to extract data
//  const clientInfoRegex = /Client Information:[\s\S]*?(.*?),\s*a (male|female) born on (\d{4}-\d{2}-\d{2}),\s*was assessed on (\d{4}-\d{2}-\d{2}),[\s\S]*?address at (.*?),\s*phone number (.*?),\s*and email (.*?)\./;
//  const referralRegex = /referred by (.*?),\s*for (.*?)./;
//  const emergencyContactRegex = /His emergency contact is his (.*?), (.*?), reachable at(.*?)/;
//  const substanceUseRegex = /Substance Use History:[\s\S]*?primary history of (.*?),\s*which began at age (\d+)[\s\S]*?currently consumes (.*?) (Daily|Weekly|Monthly),[\s\S]*?His secondary substance is (.*?),\s*used (.*?) since age (\d+),[\s\S]*?Additionally, John Doe uses (.*?),\s*having started at age (\d+),\s*usually (.*?) through (.*?)\./;
//  const otherSubstancesRegex = /Additionally, John Doe uses (.*?),\s*having started at age (\d+),\s*usually (.*?) through (.*?)\./;
//  const assessorInfoRegex = /Assessor Information:[\s\S]*?The assessment was conducted and documented by (.*?) on (\d{4}-\d{2}-\d{2})\./;

//  // Execute regex on file content
//  const clientInfoMatch = fileContent.match(clientInfoRegex);
//  const referralMatch = fileContent.match(referralRegex);
//  const emergencyContactMatch = fileContent.match(emergencyContactRegex);
//  const substanceUseMatch = fileContent.match(substanceUseRegex);
//  const otherSubstancesMatch = fileContent.match(otherSubstancesRegex);
//  const assessorInfoMatch = fileContent.match(assessorInfoRegex);

//  // Extracted data object
//  const extractedData = {
//    fullName: clientInfoMatch ? clientInfoMatch[1].toLowerCase() : '',
//    gender: clientInfoMatch ? clientInfoMatch[2].toLowerCase() : '',
//    dateOfBirth: clientInfoMatch ? clientInfoMatch[3] : '',
//    dateOfAssessment: clientInfoMatch ? clientInfoMatch[4] : '',
//    referralInformation: {
//      referredBy: referralMatch ? referralMatch[1] : '',
//      reasonForReferral: referralMatch ? referralMatch[2] : ''
//    },
//    contactInformation: {
//      address: clientInfoMatch ? clientInfoMatch[5] : '',
//      phoneNumber: clientInfoMatch ? clientInfoMatch[6] : '',
//      email: clientInfoMatch ? clientInfoMatch[7] : ''
//    },
//    emergencyContact: {
//      fullName: emergencyContactMatch ? emergencyContactMatch[2] : '',
//      relationship: emergencyContactMatch ? emergencyContactMatch[1] : '',
//      phoneNumber: emergencyContactMatch ? emergencyContactMatch[3] : ''
//    },
//    substanceUseHistory: {
//      primarySubstanceOfUse: {
//        substance: substanceUseMatch ? substanceUseMatch[1] : '',
//        ageOfFirstUse: substanceUseMatch ? parseInt(substanceUseMatch[2]) : '',
//        frequencyOfUse: substanceUseMatch ? substanceUseMatch[4] : '',
//        amountUsed: '5 drinks', // Assuming a default value for this example
//        routeOfAdministration: 'Oral' // Assuming a default value for this example
//      },
//      secondarySubstanceOfUse: {
//        substance: substanceUseMatch ? substanceUseMatch[5] : '',
//        ageOfFirstUse: substanceUseMatch ? parseInt(substanceUseMatch[7]) : '',
//        frequencyOfUse: substanceUseMatch ? substanceUseMatch[6] : '',
//        amountUsed: '1 joint', // Assuming a default value for this example
//        routeOfAdministration: 'Smoking' // Assuming a default value for this example
//      },
//      otherSubstancesUsed: otherSubstancesMatch ? [
//        {
//          substance: otherSubstancesMatch[1],
//          ageOfFirstUse: parseInt(otherSubstancesMatch[2]),
//          frequencyOfUse: otherSubstancesMatch[3],
//          amountUsed: '1 gram', // Assuming a default value for this example
//          routeOfAdministration: 'Snorting' // Assuming a default value for this example
//        }
//      ] : [],
//      previousTreatment: [
//        {
//          treatmentProgram: 'Rehab Center A',
//          datesOfTreatment: '2020-01-01 to 2020-03-01',
//          outcomes: 'Relapsed'
//        }
//      ]
//    },
//    assessmentOfDependence: {
//      tolerance: 'Needs more alcohol to feel effects',
//      withdrawalSymptoms: 'Tremors and anxiety',
//      lossOfControl: 'Unable to cut down',
//      timeSpent: 'Significant time obtaining and using',
//      reductionInActivities: 'Stopped attending social events',
//      continuedUseDespiteProblems: 'Continues to drink despite liver issues'
//    },
//    treatmentPlan: {
//      recommendedLevelOfCare: 'Outpatient',
//      specificInterventions: 'CBT and medication',
//      referralToServices: 'Mental health counseling',
//      followUpPlan: 'Monthly check-ins'
//    },
//    riskAssessment: {
//      suicidalIdeation: 'Yes',
//      homicidalIdeation: 'No',
//      selfHarmBehaviors: 'No',
//      riskToOthers: 'Yes'
//    },
//    clientStrengthsAndResources: {
//      personalStrengths: 'Determined and resilient',
//      availableResources: 'Supportive sister'
//    },
//    assessorInformation: {
//      assessorName: assessorInfoMatch ? assessorInfoMatch[1] : '',
//      assessorSignature: 'Dr. John Smith',
//      date: assessorInfoMatch ? assessorInfoMatch[2] : ''
//    }
//  };

// export const createSoap = async (req, res) => {
//   const soapData = req.body;

//   try {
//     const newSoap = new Soap(soapData);
//     const savedSoap = await newSoap.save();
//     const currentFilePath = fileURLToPath(import.meta.url);
//     const currentDirPath = path.dirname(currentFilePath);

//     const fileName = `SOAP_${savedSoap._id}.pdf`; 
//     const filesDir = path.join(currentDirPath, '../files');
//     const filePath = path.join(filesDir, fileName);
//     if (!fs.existsSync(filesDir)) {
//       fs.mkdirSync(filesDir, { recursive: true });
//     }
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream(filePath));
//     const addSection = (title, content) => {
//       doc.fontSize(14).font('Helvetica-Bold').text(title, { underline: true });
//       doc.moveDown(0.3);
//       doc.fontSize(10).font('Helvetica').text(content, { align: 'left' });
//       doc.moveDown(0.3);
//     };

 

//     doc.fontSize(12).font('Helvetica-Bold').text('Clinical Assessment Narrative', { underline: true });
//     doc.moveDown(0.5);

//     addSection('Client Information:', `
//       ${soapData.fullName}, a ${soapData.gender.toLowerCase()} born on ${soapData.dateOfBirth}, was assessed on ${soapData.dateOfAssessment}, following a referral from ${soapData.referralInformation.referredBy} for ${soapData.referralInformation.reasonForReferral}. His contact details include an address at ${soapData.contactInformation.address}, phone number tel:${soapData.contactInformation.phoneNumber}, and email mailto:${soapData.contactInformation.email}. His emergency contact is his ${soapData.emergencyContact.relationship}, ${soapData.emergencyContact.fullName}, reachable at tel:${soapData.emergencyContact.phoneNumber}.
//     `);

//     addSection('Substance Use History:', `
//       ${soapData.fullName} has a primary history of ${soapData.substanceUseHistory.primarySubstanceOfUse.substance} use, which began at age ${soapData.substanceUseHistory.primarySubstanceOfUse.ageOfFirstUse}. He currently consumes ${soapData.substanceUseHistory.primarySubstanceOfUse.substance} ${soapData.substanceUseHistory.primarySubstanceOfUse.frequencyOfUse}, averaging ${soapData.substanceUseHistory.primarySubstanceOfUse.amountUsed} through ${soapData.substanceUseHistory.primarySubstanceOfUse.routeOfAdministration} administration. His secondary substance is ${soapData.substanceUseHistory.secondarySubstanceOfUse.substance}, used ${soapData.substanceUseHistory.secondarySubstanceOfUse.frequencyOfUse} since age ${soapData.substanceUseHistory.secondarySubstanceOfUse.ageOfFirstUse}, typically ${soapData.substanceUseHistory.secondarySubstanceOfUse.amountUsed} through ${soapData.substanceUseHistory.secondarySubstanceOfUse.routeOfAdministration}. Additionally, ${soapData.fullName} uses ${soapData.substanceUseHistory.otherSubstancesUsed[0].substance} ${soapData.substanceUseHistory.otherSubstancesUsed[0].frequencyOfUse}, having started at age ${soapData.substanceUseHistory.otherSubstancesUsed[0].ageOfFirstUse}, usually ${soapData.substanceUseHistory.otherSubstancesUsed[0].amountUsed} through ${soapData.substanceUseHistory.otherSubstancesUsed[0].routeOfAdministration}.
      
//       ${soapData.fullName} has previously sought treatment at ${soapData.substanceUseHistory.previousTreatment[0].treatmentProgram} from ${soapData.substanceUseHistory.previousTreatment[0].datesOfTreatment}, but relapsed post-treatment.
//     `);

//     addSection('Objective Findings:', `
//       ${soapData.fullName}'s substance use has significantly impacted various aspects of his life:
//       Physical Health: ${soapData.consequencesOfUse.physicalHealthImpact}
//       Mental Health: ${soapData.consequencesOfUse.mentalHealthImpact}
//       Social Life: ${soapData.consequencesOfUse.socialImpact}
//       Occupational Impact: ${soapData.consequencesOfUse.occupationalEducationalImpact}
//       Legal Issues: ${soapData.consequencesOfUse.legalIssuesRelatedToUse}
//     `);

//     addSection('Assessment:', `
//       ${soapData.fullName} exhibits signs of severe alcohol dependence, including:
//       Tolerance: ${soapData.assessmentOfDependence.tolerance}
//       Withdrawal Symptoms: ${soapData.assessmentOfDependence.withdrawalSymptoms}
//       Loss of Control: ${soapData.assessmentOfDependence.lossOfControl}
//       Time Investment: ${soapData.assessmentOfDependence.timeSpent}
//       Reduction in Activities: ${soapData.assessmentOfDependence.reductionInActivities}
//       Continued Use Despite Problems: ${soapData.assessmentOfDependence.continuedUseDespiteProblems}
//     `);

//     addSection('Plan:', `
//       ${soapData.fullName} is recommended for outpatient care. Specific interventions include ${soapData.treatmentPlan.specificInterventions} and medication management. Additionally, a referral for ${soapData.treatmentPlan.referralToServices} is advised. Follow-up will involve ${soapData.treatmentPlan.followUpPlan}.
//     `);

//     addSection('Risk Assessment:', `
//       Suicidal Ideation: ${soapData.riskAssessment.suicidalIdeation}
//       Homicidal Ideation: ${soapData.riskAssessment.homicidalIdeation}
//       Self-Harm Behaviors: ${soapData.riskAssessment.selfHarmBehaviors}
//       Risk to Others: ${soapData.riskAssessment.riskToOthers}
//     `);

//     addSection('Client Strengths and Resources:', `
//       Personal Strengths: ${soapData.clientStrengthsAndResources.personalStrengths}
//       Available Resources: ${soapData.clientStrengthsAndResources.availableResources}
//     `);

//     addSection('Assessor Information:', `
//       The assessment was conducted and documented by ${soapData.assessorInformation.assessorName} on ${soapData.assessorInformation.date}.
//     `);

//     addSection('ICD-10 Code:', 'F10.20 (Alcohol dependence, uncomplicated)');
//     doc.end();
//     res.status(201).json({ document: savedSoap.document, filePath });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };