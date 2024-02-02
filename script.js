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
                      <a class='btn btn-sm float-right delete shadow-sm' 
                      data-id='${item.id}'
                      data-adim="murat"
                      data-soyadim="vuranok"
                      data-mail="murat.vuranok@code.edu.az" >  <i class='fa fa-trash text-danger'> </i>
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

  // // $('.n-list').on('click', '.categories', function () {
  // //     alert('sd')
  // // });

  // // $('.categories').click(function () { alert('zxzsad') });
  // $(document).on('click', '.categories', () => { alert('deneme') });

  $(document).on("click", ".categories", (e) => {
    // let id = e.currentTarget.dataset.id;
    let item = e.currentTarget;
    $("#cname").text(item.innerText);

    let id = item.dataset.id;
    $("#MasterId").val(id);
  });

  // let menuList = document.querySelector('.n-menu');
  // menuList.addEventListener('click', (e) => {

  //     if (e.target.classList.contains('categories')) {
  //         let id = e.target.dataset.id;

  //         alert(id)
  //     }
  // })

  $("#btnKaydet").click(() => {
    let categoryName = $("#CategoryName").val();
    let masterId = $("#MasterId").val();

    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        CategoryName: categoryName,
        MasterId: masterId,
      }),
      success: (response) => {
        document.getElementById("currentForm").reset();
        document.getElementById("MasterId").value = "null";
        loadCategories("null");
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  });

  /**
   * Delete Function
   */
  $(document).on("click", ".delete", (e) => {
    let currentItem = e.currentTarget;
    let id = $(currentItem).data("id");

    fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then(() => {
      let li = $(currentItem).closest("li");
      $(li).fadeOut(300, () => {
        let parent = $(li).parent();
        $(li).remove();
        let liCount = $(".main-li").length;
        if (liCount == 0) {
          $(parent).remove();
        }
      });
    });
  });

  // document.getElementById('btnKaydet1').addEventListener('click', () => {

  //     let categoryName = document.getElementById('CategoryName').value;
  //     let masterId = document.getElementById('MasterId').value;

  //     fetch(url, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //             CategoryName: categoryName,
  //             MasterId: masterId
  //         })
  //     })
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             return response.json();
  //         })
  //         .then(data => {
  //             console.log(data);
  //             var form = document.getElementById('currentForm');
  //             form.reset();
  //         })
  //         .catch(error => {
  //             console.error(error.message);
  //         });
  // });
});
