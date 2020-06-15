/**
 * @Description: 服务端api接口地址常量
 */
export const URL = {
	login_check: 'auth/login',
	get_user_info: 'api/user/getInfo?userId=',
	version_features_list: 'api/user/version/mlist',
	get_version_features: 'api/user/version/note',
	get_confirm_phone_for_reset_password: 'api/user/unauthorizedInfo?userId=',
	get_code_for_reset_password: 'api/user/sendCode?userId=',
	reset_password: 'api/user/resetPassword',
	get_version_detail: 'api/user/version/note?id=',
	get_salary_info: 'api/partner/hrms/worker/salary/get?y=_&m=_',
	
	change_password: 'api/user/modifyPassword',
	change_phone_number: 'api/bpm/changeAddressBookInfo',
	
	version_check: 'api/user/version/check',
	report_client_info: 'api/user/clientInfo'
};
