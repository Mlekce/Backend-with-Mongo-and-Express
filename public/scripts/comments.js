const form = document.getElementById("comments-form");
const loadCommentsbtn = document.getElementById("load-comments-btn");
const formElement = document.querySelector("form[data-postid]");

async function loadComments() {
  const commentListElement = document.createElement("ol");
  const commentsSectionElement = document.getElementById("comments");
  const id = formElement.dataset.postid;
  const fetching = await fetch(`/post/${id}/comments`);
  const comments = await fetching.json();

  commentsSectionElement.innerHTML = "";

  for (let comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
            <article class="comment-item">
                <h2>${comment.title}</h2>
                <p>${comment.text}</p>
            </article>
        `;
    commentListElement.appendChild(commentElement);
  }

  commentsSectionElement.appendChild(commentListElement);
  console.log(comments);
}

async function submitComment(event) {
  event.preventDefault();
  const id = formElement.dataset.postid;
  const title = document.getElementById("title").value;
  const comment = document.getElementById("text").value;
  const csrf = document.getElementById("csrf").value;
  if (
    title.trim().length > 0 &&
    comment.trim().length > 0 &&
    title &&
    id &&
    comment
  ) {
    let new_comment = { title: title, text: comment, postid: id };
    try {
      await fetch(`/post/${id}/comments`, {
        method: "POST",
        body: JSON.stringify(new_comment),
        headers: {
          "Content-type": "application/json",
          "X-CSRF-Token": csrf,
        },
      });

      // Reset form fields manually after the fetch is completed
      document.getElementById("title").value = "";
      document.getElementById("text").value = "";
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Wrong input");
  }
  loadComments();
}

loadCommentsbtn.addEventListener("click", loadComments);
form.addEventListener("submit", submitComment);
