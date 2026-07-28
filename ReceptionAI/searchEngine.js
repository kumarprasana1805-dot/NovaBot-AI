let knowledge = {};

export async function loadKnowledge() {
    const res = await fetch("./data/knowledgeBase.json");
    knowledge = await res.json();
}

export function receptionReply(question) {

    question = question.toLowerCase();

    // SCHOOL
    if (question.includes("principal"))
        return knowledge.school.principal;

    if (question.includes("vice principal"))
        return knowledge.school.vicePrincipal;

    if (question.includes("school timing"))
        return knowledge.school.schoolTiming;

    if (question.includes("address"))
        return knowledge.school.address;

    if (question.includes("director"))
        return knowledge.teachers.director;

    // TEACHERS
    for (const subject in knowledge.teachers) {

        if (question.includes(subject.toLowerCase())) {

            return knowledge.teachers[subject];

        }

    }

    // FEES
    if (question.includes("fee")) {

        for (const cls in knowledge.fees) {

            let name = cls.toLowerCase();

            if (question.replace(/\s/g,"").includes(name)) {

                return knowledge.fees[cls];

            }

        }

    }

    // TRANSPORT

    if (question.includes("transport"))
        return knowledge.transport.available;

    if (question.includes("bus"))
        return knowledge.transport.available;

    if (question.includes("transport incharge"))
        return knowledge.transport.transportIncharge;

    if (question.includes("transport phone"))
        return knowledge.transport.phone;

    return "Sorry, I don't have information about that.";
}