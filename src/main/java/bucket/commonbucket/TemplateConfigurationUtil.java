package bucket.commonbucket;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import freemarker.cache.ClassTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.TemplateExceptionHandler;

public class TemplateConfigurationUtil {
private static Configuration configuration ;
private static final Logger LOG = LogManager.getLogger(TemplateConfigurationUtil.class);
		private TemplateConfigurationUtil(){}
	    private static Configuration getConfig(){	
	    	LOG.debug(" Entry into getConfig");
	        configuration = new Configuration(Configuration.VERSION_2_3_23);
	        ClassTemplateLoader loader = new ClassTemplateLoader(TemplateConfigurationUtil.class, "/ecomtemplates/");
	        configuration.setTemplateLoader(loader);
	        configuration.setDefaultEncoding("UTF-8");
	        configuration.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
	        LOG.debug(" Exit from getConfig");
	        return configuration;
	    }
	    public static Configuration getConfiguration() {
	    	LOG.debug(" Entry into getConfiguration");
	    	if(null==configuration){
	    		configuration=getConfig();
	    	}
	    	LOG.debug(" Exit from getConfiguration");
	       return configuration;
	    }
}
