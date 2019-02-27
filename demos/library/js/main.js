$(function () {
  $("#fold").on("click", function () {
    window.location = "/";
  });

  var table = $('#main-table').DataTable({
    select: 'single',
    altEditor: true,
    dom: 'Bfrtip',
    buttons: [{
      className: 'dt-button-add',
      text: 'Add',
      name: 'add',
    },
    {
      className: 'dt-button-edit',
      extend: 'selected',
      text: 'Edit',
      name: 'edit'
    },
    {
      className: 'dt-button-delete',
      extend: 'selected',
      text: 'Delete',
      name: 'delete'
    }]
  });

  function str_pad(n) {
    return String("0" + n).slice(-2);
  }

  function get_all_inputs(inputs) {
    $("#altEditor-form :input").each(function () {
      var name = $(this).attr('name');
      var val = $(this).val();
      inputs[name] = val;
    });
  }

  function check_all_inputs(inputs) {
    for (var e in inputs) {
      if (inputs[e] == "") {
        if ($(".info-label").hasClass('alert-success'))
          $(".info-label").toggleClass('alert-success alert-danger');

        $(".info-label").text("Fill all inputs!");
        $(".info-label").show();
        return false;
      }
    }
    return true;
  }

  function info_label_response(response, message) {
    if (response == 'success') {
      if ($(".info-label").hasClass('alert-danger'))
        $(".info-label").toggleClass('alert-danger alert-success');
      $(".info-label").text(message);
      $(".info-label").show();
    } else {
      if ($(".info-label").hasClass('alert-success'))
        $(".info-label").toggleClass('alert-success alert-danger');
      $(".info-label").text(response);
      $(".info-label").show();
    }
  }

  $('.dt-button-add').on('click', function (e) {
    var d = new Date($.now());
    $("#altEditor-form :input").each(function () {
      if ($(this).attr('name') == 'created_at' || $(this).attr('name') == 'updated_at') {
        $(this).val(d.getFullYear() + "-" + str_pad(d.getMonth() + 1) + "-" + str_pad(d.getDate()) + " " + str_pad(d.getHours()) + ":" + str_pad(d.getMinutes()) + ":" + str_pad(d.getSeconds()));
        $(this).prop('readonly', true);
      } else if ($(this).attr('name') == 'remember_token') {
        $(this).val('null');
        $(this).prop('readonly', true);
      }
    });
  });

  // Add row button
  $('#altEditor-modal').on('click', '#addRowBtn', function (e) {
    e.preventDefault();
    var inputs = {};
    get_all_inputs(inputs);
    if (!check_all_inputs(inputs))
      return false;

    var inputs_array = new Array();
    for (var items in inputs) {
      inputs_array.push(inputs[items]);
    }

    info_label_response('success', "Successfully added!");
    table.row.add(inputs_array).draw();
  });

  // Edit row button
  $('#altEditor-modal').on('click', '#editRowBtn', function (e) {
    e.preventDefault();
    var inputs = {};
    get_all_inputs(inputs);
    if (!check_all_inputs(inputs))
      return false;

    var inputs_array = new Array();
    for (var items in inputs) {
      inputs_array.push(inputs[items]);
    }
    info_label_response('success', "Successfully edited!");
    table.row({ selected: true }).data(inputs_array);
  });

  // Delete row btn
  $('#altEditor-modal').on('click', '#deleteRowBtn', function (e) {
    e.preventDefault();

    info_label_response('success', "Successfully deleted!");
  });

});
