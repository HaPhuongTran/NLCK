package com.sm.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.sm.dao.DeviceDao;
import com.sm.entity.Device;
import com.sm.service.DeviceService;

@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class DeviceServiceImpl implements DeviceService {
	
	@Autowired
	DeviceDao deviceDao;
	
	@Override
	@Transactional
	public void saveOrUpdate(List<Device> devices) {
		List<Device> devicesave = new ArrayList<Device>();
		for (Device device : devices) {
			if(device.getNameDevice().length()>0 && device.getIp().length()>0) {
				devicesave.add(device);
			}
			else {
			}
		}
		deviceDao.saveOrUpdate(devicesave);
	}

}
