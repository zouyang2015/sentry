import React from 'react';

import {mount} from 'enzyme';
import {OrganizationUserFeedback} from 'app/views/userFeedback/organizationUserFeedback';

describe('OrganizationUserFeedback', function() {
  beforeEach(function() {
    const pageLinks =
      '<https://sentry.io/api/0/organizations/sentry/user-feedback/?statsPeriod=14d&cursor=0:0:1>; rel="previous"; results="false"; cursor="0:0:1", ' +
      '<https://sentry.io/api/0/organizations/sentry/user-feedback/?statsPeriod=14d&cursor=0:100:0>; rel="next"; results="true"; cursor="0:100:0"';

    MockApiClient.addMockResponse({
      url: '/organizations/org-slug/user-feedback/',
      body: [TestStubs.UserFeedback()],
      headers: {Link: pageLinks},
    });

    MockApiClient.addMockResponse({
      url: '/organizations/org-slug/environments/',
      body: TestStubs.Environments(),
    });
  });

  it('renders', function() {
    const params = {
      organization: TestStubs.Organization({features: ['sentry10']}),
      location: {query: {}, search: ''},
      params: {
        orgId: 'org-slug',
      },
    };
    const wrapper = mount(
      <OrganizationUserFeedback {...params} />,
      TestStubs.routerContext()
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('no access', function() {
    const params = {
      organization: TestStubs.Organization(),
      location: {query: {}, search: ''},
      params: {
        orgId: 'org-slug',
      },
    };

    const wrapper = mount(
      <OrganizationUserFeedback {...params} />,
      TestStubs.routerContext()
    );

    expect(wrapper.text()).toBe("You don't have access to this feature");
  });
});
