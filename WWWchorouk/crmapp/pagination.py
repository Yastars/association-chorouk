from rest_framework import pagination

class HeaderPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        headers = {'X-Page': self.page.number, 'X-Per-Page': self.page_size,
                   'X-Total': self.page.paginator.count,
                   'X-Total-Pages': self.page.paginator.num_pages,
                   'Access-Control-Expose-Headers': 'X-Page, X-Per-Page, X-Total, X-Total-Pages'}

        return Response(data, headers=headers)