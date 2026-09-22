/* Finad all elements that have the ".faq-question" class */
const faqQuestions = document.querySelectorAll(".faq-question");

/* Repeat the following code for each FAQ questions */
faqQuestions.forEach(function (question)
{
    /* Run the function when the user clicks FAQ question */ 
    question.addEventListener("click", function ()
    {
        /* Get the element immediately after the clicked question */
        const answer = question.nextElementSibling;
        /* Find the <span> element inside the clicked question */
        const icon = question.querySelector("span");

        /*
        Add or remove the "show" class from the answer
        This shows or hides the FAQ answer using css
        */
        answer.classList.toggle("show"); 
        

        /* Check whether the answer currently has the "show" class */
        if (answer.classList.contains("show"))
            {
                icon.textContent = "-";
            }
            
        else
            {
                icon.textContent = "+";
            }
    });
});