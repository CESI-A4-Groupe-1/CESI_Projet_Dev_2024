import { mount } from '@vue/test-utils';
import AccountView from '@/views/customer/AccountView.vue';
import { AccountService } from '@/services/AccountService';

// Mocking AccountService
jest.mock('@/services/AccountService', () => ({
    getUser: jest.fn(),
    updateUser: jest.fn(),
    logout: jest.fn(),
}));

describe('AccountView.vue', () => {
    let wrapper;

    beforeEach(() => {
        // Mock route and router
        const mockRoute = {
            params: { id: '123' },
        };
        const mockRouter = {
            push: jest.fn(),
        };

        wrapper = mount(AccountView, {
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter,
                },
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders user information correctly', async () => {
        // Mocking getUser response
        const mockUser = {
            id: '123',
            nom: 'Doe',
            prenom: 'John',
            email: 'john.doe@example.com',
            role_id: 'user',
            date_anniv: '',
            telephone: '123456789',
            is_notified: false,
            path_pfp: '',
            id_parain: '',
            adresse: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: '',
        };
        AccountService.getUser.mockResolvedValueOnce({ data: mockUser });

        // Wait for component to update
        await wrapper.vm.$nextTick();

        // Assert user information is rendered correctly
        expect(wrapper.find('.data').text()).toContain('John Doe');
        expect(wrapper.find('.data').text()).toContain('john.doe@example.com');
        expect(wrapper.find('.data').text()).toContain('123456789');
    });

    it('updates user profile picture correctly', async () => {
        // Mocking update user profile picture
        const mockImageFile = new File(['dummy'], 'dummy.png', { type: 'image/png' });
        const input = wrapper.find('#file');
        input.element.files = [mockImageFile];
        input.trigger('change');

        // Mocking updateUser function
        await wrapper.vm.updateUser();

        // Assert updateUser function was called
        expect(AccountService.updateUser).toHaveBeenCalled();
    });

    it('logs out user correctly', async () => {
        // Mocking logout function
        await wrapper.vm.logout();

        // Assert logout function was called and router.push('/login') was called
        expect(AccountService.logout).toHaveBeenCalled();
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
    });

    // Add more tests as needed for other functionality like navigation, error handling, etc.
});
