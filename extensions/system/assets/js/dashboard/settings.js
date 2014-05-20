require(['jquery', 'uikit!nestable', 'rowselect', 'domReady!'], function($, uikit, RowSelect) {

    var form         = $('#js-dashboard'),
        params       = form.data(),
        showOnSelect = form.find('.js-show-on-select').addClass('uk-hidden'),
        table        = form.on('selected-rows', function(e, rows) { showOnSelect[rows.length ? 'removeClass':'addClass']('uk-hidden'); }),
        rowselect    = new RowSelect(table, { 'rows': '.pk-table-fake' });

    // action button
    form.on('click', '[data-action]', function(e) {
        e.preventDefault();
        form.attr('action', $(this).data('action')).submit();
    })

        // save widgets order on nestable change
        .on('nestable-change', 'ul.uk-nestable', function(e) {
            $.post(params.reorder, { order: $(this).data('nestable').serialize(), _csrf: $('[name="_csrf"]').val() }, function(response) {
                uikit.notify(response.message || 'Widgets order updated', 'success');
            }).fail(function() {
                uikit.notify('Unable to reorder widgets.', 'danger');
            });
        });
});