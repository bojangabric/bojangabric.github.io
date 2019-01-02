$(function () {
  $(".datepick").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    minDate: 0,
    maxDate: 365
  });

  $("input[name='datum_dolaska']").datepicker().datepicker("setDate", "+0");
  $("input[name='datum_odlaska']").datepicker().datepicker("setDate", "+7");

  $(".btn-rezervisi").on("click", function () {
    $(".ime_sobe_i_hotela").text($(this).parent().parent().children().html());
    $("#datum_dolaska_modal").val($(this).parent().parent().find(".datum_dolaska").val());
    $("#datum_odlaska_modal").val($(this).parent().parent().find(".datum_odlaska").val());
    $("#soba_id_modal").val($(this).parent().parent().find("#soba_id").val());
  });
});
