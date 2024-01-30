$(() => {
  // npx json-server --watch db.json  --port 3000
  const url = "http://localhost:3000/categories";
  function loadCategories(id) {
    $.getJSON(`${url}?MasterId=${id}`, (data) => {
      if (data.length > 0) {
        let templates = [];
        let count = $(".n-list").length; //0

        templates.push(
          `<div class='col-3'>
                            <ul class='n-list list-group list-group-flush border rounded shadow-sm p-3' data-order='${count}'> `
        );

        $.each(data, (i, item) => {
          let template = `
                            <li class='list-group-item main-li'> 
                                <a class='categories' href='#' data-id='${item.id}'> ${item.CategoryName} </a> 
                                <a class='btn btn-sm float-right delete shadow-sm' data-id='${item.id}'> 
                                    <i class='fa fa-trash text-danger'> </i>
                                <a/>
                            </li>`;
          templates.push(template);
        });

        templates.push("</ul></div>");
        $(".n-menu").html(templates.join(""));

        // appent +=
        // html   =
      }
    }).fail((err) => {
      console.log(err.message);
    });
  }
  loadCategories("null");

  //   $(".categories").click(function () {
  //     alert("zxzsad");
  //   });

//   $(".n-menu").on("click", ".categories", function () {
//     alert("zxzsad");
//   });


});
