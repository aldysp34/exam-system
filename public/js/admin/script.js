function toggleActive(id) {
    $.ajax({
        url: "/cbt/admin/manage/users/" + id,
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        cache: false,
        success: function (res) {
            if (res == "not_active") {
                $("#door-" + id).addClass("fa-door-open");
                $("#door-" + id).removeClass("fa-door-closed");
            } else {
                $("#door-" + id).addClass("fa-door-closed");
                $("#door-" + id).removeClass("fa-door-open");
            }
        },
    });
}

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function logout(e) {
    e.preventDefault();
    $.ajax({
        url: "/logout",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        cache: false,
        success: function () {
            window.location.href = "/login";
        },
        error: function () {
            window.location.href = "/login";
        },
    });
}

function init_dataTable() {
    $("#dataTable").DataTable({
        pageLength: Infinity,
        paging: false,
    });

    $("#example2")
        .DataTable({
            responsive: true,
            lengthChange: false,
            autoWidth: false,
            buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        })
        .buttons()
        .container()
        .appendTo("#example2_wrapper .col-md-6:eq(0)");

    $("#example2_wrapper .col-md-6:eq(0)").addClass("col-md-8");
    $("#example2_wrapper .col-md-6:eq(0)").removeClass("col-md-6");

    $("#example2_wrapper .col-md-6:eq(0)").addClass("col-md-4");
    $("#example2_wrapper .col-md-6:eq(0)").removeClass("col-md-6");

    $("#example2_wrapper .col-md-8:eq(0) .dt-buttons").append(
        $("#btn-create").html()
    );
}

function set_logout_btn() {
    for (let item of $(".btn-logout")) {
        item.addEventListener("click", logout);
    }
}

function get_test_detail() {
    $.ajax({
        url: "/cbt/admin/manage/tests/" + $(this).data("id"),
        type: "GET",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        cache: false,
        success: function (res) {
            if (res) {
                $("#test_name").val(res.test_name);
                $("#for").val(res.for);
                $("#total_question").val(res.quizzes.length);
                $("#start_time").val(res.start_test);
                $("#end_time").val(res.end_test);
                $("#basic_point").val(res.basic_point);
                $("#max_point").val(res.maximal_point);
                $("#duration").val(res.duration + ' menit');
                $("#created_at").val(
                    moment(res.created_at).format("YYYY-MM-DD h:mm:ss")
                );
                $("#updated_at").val(
                    moment(res.updated_at).format("YYYY-MM-DD h:mm:ss")
                );
                $("#btn-user").data("id", res.id);
            }
        },
    });
}

function get_test_details() {
    $(this).on("click", get_test_detail);
}

function get_user_participants() {
    $.ajax({
        url: "/cbt/admin/manage/tests/" + $(this).data("id"),
        type: "GET",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        cache: false,
        success: function (res) {
            var tbl_participant = ``;
            var no = 1;
            res.participants.forEach((participant) => {
                tbl_participant += `
                    <tr>
                        <th scope="row">${no}</th>
                        <td>${participant.username}</td>
                        <td>${participant.name}</td>
                        <td>${participant.class}</td>
                    </tr>
                `;
                no++;
            });
            $("#tbl-body").html(tbl_participant);
        },
    });
}

function init_select2() {
    var choices = $("#choices").select2({
        theme: "bootstrap4",
        tags: true,
        placeholder: "Insert Choices",
        allowClear: true,
    });
    choices.on("select2:unselect", function (e) {
        $("select#choices option[value='" + e.params.data.id + "'")[0].remove();
        $("select#choice option[value='" + e.params.data.id + "'")[0].remove();
    });

    $(".select2bs4").select2({
        theme: "bootstrap4",
    });

    $("#choice").select2({
        theme: "bootstrap4",
        placeholder: "Select Correct Choice",
    });
}

function init_datetime_picker() {
    $("#start-test").datetimepicker({
        icons: {
            time: "far fa-clock"
        },
        format: "YYYY-MM-DD HH:mm:ss",
    });

    $("#end-test").datetimepicker({
        icons: {
            time: "far fa-clock"
        },
        format: "YYYY-MM-DD HH:mm:ss",
    });
}

function check_or_not() {
    if (this.checked) {
        $(".participants").each(function () {
            this.checked = true;
        });
    } else {
        $(".participants").each(function () {
            this.checked = false;
        });
    }
}

function check_core_checkbox() {
    if ($(".participants:checked").length == $(".participants").length) {
        $("#select_all").prop("checked", true);
    } else {
        $("#select_all").prop("checked", false);
    }
}

function submit_form_participant() {
    $("#form-participant").submit();
}

function change_answer() {
    if ($("#type-question").val() == 1) {
        $("#choice-div").removeClass("d-none");
        $("#answer-div").addClass("d-none");
    } else {
        $("#choice-div").addClass("d-none");
        $("#answer-div").removeClass("d-none");
    }
}

function list_correct_answer_field() {
    var value = $("#choices").val();

    $("#choice").select2({
        theme: "bootstrap4",
        placeholder: "Select Correct Choice",
        data: value,
    });

    if (value.length == 0) {
        $("#choice").html("");
    }
}

function get_question_detail() {
    $.ajax({
        url: "/cbt/admin/manage/tests/" +
            $(this).data("id") +
            "/questions/" +
            $(this).data("quiz-id"),
        type: "GET",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        cache: false,
        success: function (res) {
            if (res) {
                $("#question").html(res.quiz.question);

                if (res.quiz.type_id == 1) {
                    var choices = `<ul>`;
                    res.choices.forEach((choice) => {
                        choices += `
                        <li>${choice.value}</li>
                    `;
                    });
                    choices += `</ul>`;
                    $("#available_choices").html(choices);
                    $("#correct_choice").val(res.choice.value);
                    $("#answer-div").addClass("d-none");
                    $("#choice-div").removeClass("d-none");
                } else if (res.quiz.type_id == 2) {
                    $("#answer").html(res.quiz.correct_answer);
                    $("#choice-div").addClass("d-none");
                    $("#answer-div").removeClass("d-none");
                }
            }
        },
    });
}

function init_tinymce() {
    tinymce.init({
        selector: "textarea.tinymce",
        plugins: "print preview importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        mobile: {
            plugins: "print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help charmap quickbars emoticons",
        },
        menu: {
            tc: {
                title: "Comments",
                items: "addcomment showcomments deleteallconversations",
            },
        },
        menubar: "file edit view insert format tools table tc help",
        toolbar: "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
        image_advtab: true,
        height: 500,
        image_caption: true,
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        toolbar_mode: "sliding",
        tinycomments_mode: "embedded",
        contextmenu: "link image imagetools table configurepermanentpen",
    });
}

function selectAdminIfSuperAdminSelected() {
    $('#is_admin').val('1');
}

function unselectSuperAdminIfAdminNotSelected() {
    $('#is_super_admin').val('0');
}

$(document).ready(function () {
    $("#show-password").on("change", showPassword);
    $("#submit-form-participant").on("click", submit_form_participant);
    $("#select_all").on("click", check_or_not);
    $(".participants").on("click", check_core_checkbox);
    $("#type-question").on("change", change_answer);
    $("#choices").on("change", list_correct_answer_field);
    $(".btn-detail").each(get_test_details);
    $("#btn-user").on("click", get_user_participants);
    $(".btn-detail-question").on("click", get_question_detail);
    $("#th-checkbox").css("cursor", "default");
    $('#is_super_admin').on('change', selectAdminIfSuperAdminSelected);
    $('#is_admin').on('change', unselectSuperAdminIfAdminNotSelected);
    change_answer();
    check_core_checkbox();
    init_select2();
    init_datetime_picker();
    init_dataTable();
    set_logout_btn();
    init_tinymce();
});
